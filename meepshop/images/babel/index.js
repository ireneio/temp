// import
const fs = require('fs');
const nodePath = require('path');

require('dotenv').config({
  path: nodePath.resolve(__dirname, '../../../.env'),
});
const { declare } = require('@babel/helper-plugin-utils');
const { transformSync } = require('@babel/core');
const { default: Imgproxy } = require('imgproxy');
const dirTree = require('directory-tree');
const d3 = require('d3-hierarchy');
const execa = require('execa');
const outputFileSync = require('output-file-sync');
const invariant = require('fbjs/lib/invariant');

const svgPlugin = require('@meepshop/icons/babel/svgPlugin');
const addDisplayName = require('../../../babel/addDisplayName');

[
  'IMGPROXY_KEY_STAGE',
  'IMGPROXY_SALT_STAGE',
  'IMGPROXY_KEY_PRODUCTION',
  'IMGPROXY_SALT_PRODUCTION',
].forEach(key => {
  invariant(process.env[key], `process.env.${key} is not defined.`);
});

// definition
const imgproxy = {
  stage: new Imgproxy({
    baseUrl: 'https://img.meepstage.com/',
    key: process.env.IMGPROXY_KEY_STAGE,
    salt: process.env.IMGPROXY_SALT_STAGE,
    encode: true,
  }),
  production: new Imgproxy({
    baseUrl: 'https://img.meepshop.com/',
    key: process.env.IMGPROXY_KEY_PRODUCTION,
    salt: process.env.IMGPROXY_SALT_PRODUCTION,
    encode: true,
  }),
};

const imageFolder = nodePath.resolve(__dirname, '../images');
const imageList = d3
  .hierarchy(
    dirTree(imageFolder, { extensions: /\.(svg|png|jpg|jpeg|gif|ico)$/ }),
  )
  .leaves()
  .reduce((result, { data: { type, path, extension } }) => {
    if (type === 'directory') return result;

    const filePath = nodePath.relative(imageFolder, path);
    const key = filePath
      .replace(extension, '')
      .split(/\//)
      .reduce(
        (filePathKeyResult, filePathKey, index) =>
          `${filePathKeyResult}${
            index === 0 ? filePathKey[0] : filePathKey[0].toUpperCase()
          }${filePathKey.slice(1)}`,
        '',
      );
    const { stdout: imageHash } = execa.sync('git', [
      'log',
      '-n',
      '1',
      '--pretty=format:%h',
      '--abbrev=8',
      path,
    ]);

    return {
      ...result,
      [key]: `${filePath.replace(extension, '')}_${imageHash}${extension}`,
    };
  }, {});

const getUrl = (key, type, width, height) =>
  [
    !width ? null : result => result.width(width),
    !height ? null : result => result.height(height),
    result =>
      result.generateUrl(
        `gs://img.meepcloud.com/assets/${imageList[key]}`,
        !/\.svg$/.test(imageList[key]) ? undefined : 'svg',
      ),
  ]
    .filter(Boolean)
    .reduce((result, func) => func(result), imgproxy[type].builder());

const generateCompoent = (imageName, path) => {
  if (!imageList[imageName])
    throw path.buildCodeFrameError(`Can not find image: \`${imageName}\``);

  const content = fs
    .readFileSync(
      nodePath.resolve(
        imageFolder,
        imageList[imageName].replace(/_.*/, '.svg'),
      ),
      'utf-8',
    )
    .replace(/<\?xml version="1.0" encoding="UTF-8"\?>/, '')
    .replace(/<!-- .* -->/, '')
    .replace(/xmlns:xlink/g, 'xmlns')
    .replace(/xlink:href/g, 'xmlns');
  const filePath = nodePath.resolve(
    __dirname,
    '../lib',
    imageName.replace(/$/, '.js'),
  );

  outputFileSync(
    filePath,
    transformSync(
      `import React from 'react';

export default React.memo(props => (
  ${content}
));`,
      {
        cwd: nodePath.resolve(__dirname, '..'),
        filename: filePath.replace(/lib/g, 'src'),
        configFile: false,
        babelrc: false,
        presets: [
          [
            '@babel/env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
          '@babel/react',
        ],
        plugins: [addDisplayName, [svgPlugin, { keepSize: true }]],
      },
    ).code,
  );
};

module.exports = declare(({ assertVersion, types: t }) => {
  assertVersion(7);

  const cache = {};

  const addRequire = (name, ...nodes) =>
    t.callExpression(
      t.memberExpression(
        t.callExpression(t.identifier('require'), [t.stringLiteral(name)]),
        t.identifier('default'),
      ),
      nodes.filter(Boolean),
    );

  const getScaledSrc = (key, width, height) =>
    addRequire(
      process.env.NODE_ENV === 'test'
        ? '@meepshop/images/src/getImage'
        : '@meepshop/images/lib/getImage',
      t.objectExpression([
        t.objectProperty(
          t.identifier('stage'),
          t.stringLiteral(getUrl(key, 'stage', width, height)),
        ),
        t.objectProperty(
          t.identifier('production'),
          t.stringLiteral(getUrl(key, 'production', width, height)),
        ),
      ]),
    );

  const replaceWithImage = (path, originalKey) => {
    const { key, width, height, useScaledSrc } = originalKey
      .split(/_/)
      .reduce((result, str) => {
        if (/^w\d/.test(str))
          return {
            ...result,
            width: str.replace(/^w/, ''),
          };

        if (/^h\d/.test(str))
          return {
            ...result,
            height: str.replace(/^h/, ''),
          };

        if (/^scaledSrc$/.test(str))
          return {
            ...result,
            useScaledSrc: true,
          };

        return {
          ...result,
          key: str,
        };
      }, {});

    if (!imageList[key])
      throw path.buildCodeFrameError(`Can not find image key: \`${key}\``);

    if (useScaledSrc) {
      path.replaceWith(
        t.objectExpression(
          [
            '60',
            '120',
            '240',
            '480',
            '720',
            '960',
            '1200',
            '1440',
            '1680',
            '1920',
          ].map(scaledSrcWidth =>
            t.objectProperty(
              t.identifier(`w${scaledSrcWidth}`),
              getScaledSrc(key, scaledSrcWidth),
            ),
          ),
        ),
      );
      return;
    }

    path.replaceWith(getScaledSrc(key, width, height));
  };

  const addDynamicComponent = (path, localKey, key, filename) => {
    const componentName = key.replace(/_react$/, '');
    const componentPath = `@meepshop/images/lib/${componentName}`;
    const webpackNode = t.objectProperty(
      t.identifier('webpack'),
      t.functionExpression(
        t.identifier('webpack'),
        [],
        t.blockStatement([
          t.returnStatement(
            t.arrayExpression([
              t.callExpression(
                t.memberExpression(
                  t.identifier('require'),
                  t.identifier('resolveWeak'),
                ),
                [t.stringLiteral(componentPath)],
              ),
            ]),
          ),
        ]),
      ),
    );
    const modulesNode = t.objectProperty(
      t.identifier('modules'),
      t.arrayExpression([
        t.binaryExpression(
          '+',
          t.stringLiteral(`${filename} -> `),
          t.stringLiteral(componentPath),
        ),
      ]),
    );

    path.insertAfter(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(localKey),
          addRequire(
            'next/dynamic',
            t.arrowFunctionExpression(
              [],
              t.callExpression(t.import(), [t.stringLiteral(componentPath)]),
            ),
            process.env.NODE_ENV === 'test'
              ? null
              : t.objectExpression([
                  t.objectProperty(
                    t.identifier('loadableGenerated'),
                    t.objectExpression([webpackNode, modulesNode]),
                  ),
                ]),
          ),
        ),
      ]),
    );
    path.scope.registerDeclaration(path.getNextSibling());
    generateCompoent(componentName, path);
  };

  const generateDefaultTypes = (path, filename) => {
    if (filename !== nodePath.resolve(__dirname, '../src/types.ts')) return;

    outputFileSync(
      nodePath.resolve(__dirname, '../lib/defaultTypes.tsx'),
      `// Only for typescript, do not import
// typescript import
import { CSSProperties } from 'react';

// import
import React from 'react';

// typescript definition
interface PropsType {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

// definition
export const mockData = 'image';
export const mockScaledSrc = {
  w60: mockData,
  w120: mockData,
  w240: mockData,
  w480: mockData,
  w720: mockData,
  w960: mockData,
  w1200: mockData,
  w1440: mockData,
  w1680: mockData,
  w1920: mockData,
};
export const mockComponent = React.memo((props: PropsType) => (
  <svg {...props} />
));

/* eslint-disable @typescript-eslint/camelcase */
${Object.keys(imageList)
  .map(
    key => `export const ${key} = mockData;
export const ${key}_scaledSrc = mockScaledSrc;
export const ${key}_react = mockComponent;`,
  )
  .join('\n')}
`,
    );

    path.replaceWith(
      t.program([
        t.throwStatement(
          t.newExpression(t.identifier('Error'), [
            t.stringLiteral('This file is only for typescript.'),
          ]),
        ),
      ]),
    );
  };

  return {
    pre: () => {
      cache.images = [];
    },
    visitor: {
      ImportDeclaration: (
        path,
        {
          file: {
            opts: { filename },
          },
        },
      ) => {
        if (
          !t.isLiteral(path.get('source').node, { value: '@meepshop/images' })
        )
          return;

        path.get('specifiers').forEach(specifier => {
          if (!t.isImportSpecifier(specifier)) return;

          const key = specifier.get('imported').node.name;
          const localKey = specifier.get('local').node.name;

          if (/_react$/.test(key)) {
            specifier.remove();
            addDynamicComponent(path, localKey, key, filename);
          } else cache.images.push({ key, localKey });
        });
        path.remove();
      },
      ExportNamedDeclaration: (
        path,
        {
          file: {
            opts: { filename },
          },
        },
      ) => {
        if (
          !t.isLiteral(path.get('source').node, { value: '@meepshop/images' })
        )
          return;

        const exportedNodes = path
          .get('specifiers')
          .reduce((result, specifier) => {
            if (!t.isExportSpecifier(specifier)) return result;

            const key = specifier.get('local').node.name;
            const localKey = specifier.get('exported').node.name;

            if (/_react$/.test(key))
              addDynamicComponent(path, localKey, key, filename);
            else {
              cache.images.push({ key, localKey });
              path.insertAfter(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier(localKey),
                    t.stringLiteral(key),
                  ),
                ]),
              );
            }

            return [
              ...result,
              t.exportSpecifier(t.identifier(localKey), t.identifier(localKey)),
            ];
          }, []);

        path.replaceWith(t.exportNamedDeclaration(null, exportedNodes));
      },
      Identifier: path => {
        if (path.parentPath.isExportSpecifier()) return;

        const image = cache.images.find(
          ({ localKey }) => path.node.name === localKey,
        );

        if (!image) return;

        replaceWithImage(
          !path.parentPath.isVariableDeclarator()
            ? path
            : path.parentPath.get('init'),
          image.key,
        );
      },
    },
    post: ({ opts: { filename }, path }) => {
      generateDefaultTypes(path, filename);
    },
  };
});
