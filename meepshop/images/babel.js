// import
const fs = require('fs');
const nodePath = require('path');
const crypto = require('crypto');

require('dotenv').config({ path: nodePath.resolve(__dirname, '../../.env') });
const { declare } = require('@babel/helper-plugin-utils');
const { transformSync } = require('@babel/core');
const { default: Imgproxy } = require('imgproxy');
const dirTree = require('directory-tree');
const d3 = require('d3-hierarchy');
const execa = require('execa');
const outputFileSync = require('output-file-sync');
const invariant = require('fbjs/lib/invariant');

const svgPlugin = require('@meepshop/icons/svgPlugin');

[
  'IMGPROXY_KEY_STAGE',
  'IMGPROXY_SALT_STAGE',
  'IMGPROXY_KEY_PRODUCTION',
  'IMGPROXY_SALT_PRODUCTION',
].forEach(key => {
  invariant(process.env[key], `process.env.${key} is not defined.`);
});

// definition
const hash = crypto
  .createHash('md5')
  .update('@meepshop/images')
  .digest('hex');
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

const imageFolder = nodePath.resolve(__dirname, './images');
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

  outputFileSync(
    nodePath.resolve(imageFolder, '../lib', imageName.replace(/$/, '.js')),
    transformSync(
      `import React from 'react';

export default React.memo(props => (
  ${content}
));`,
      {
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
        plugins: [[svgPlugin, { keepSize: true }]],
      },
    ).code,
  );
};

module.exports = declare(({ assertVersion, types: t }) => {
  assertVersion(7);

  const cache = {};
  const getScaledSrc = (key, width, height) =>
    t.callExpression(t.identifier('getImage'), [
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
    ]);

  const replaceWithComponent = (path, localKey, key) => {
    path.insertAfter(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(localKey),
          t.callExpression(
            t.memberExpression(
              t.callExpression(t.identifier('require'), [
                t.stringLiteral('next/dynamic'),
              ]),
              t.identifier('default'),
            ),
            [
              t.arrowFunctionExpression(
                [],
                t.callExpression(t.import(), [
                  t.stringLiteral(
                    `@meepshop/images/lib/${key.replace(/_react$/, '')}`,
                  ),
                ]),
              ),
            ],
          ),
        ),
      ]),
    );
    generateCompoent(key.replace(/_react$/, ''), path);
  };

  const replaceWithGetImage = path => {
    path.replaceWith(
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier('getImage'))],
        t.stringLiteral(
          process.env.NODE_ENV === 'test'
            ? '@meepshop/images/src/getImage'
            : '@meepshop/images/lib/getImage',
        ),
      ),
    );
  };

  const replaceWithAllImages = (path, localKey) => {
    path.addComments('inner', [
      { type: 'CommentBlock', value: 'compiled by @meepshop/images' },
    ]);
    path
      .getStatementParent()
      .insertBefore(
        t.ifStatement(
          t.binaryExpression(
            '===',
            t.memberExpression(
              t.memberExpression(t.identifier('process'), t.identifier('env')),
              t.identifier('NODE_ENV'),
            ),
            t.stringLiteral('production'),
          ),
          t.throwStatement(
            t.newExpression(t.identifier('Error'), [
              t.stringLiteral(
                `Can not use \`import * as ${localKey} from '@meepshop/images';\` in the production mode.`,
              ),
            ]),
          ),
        ),
      );
    path.replaceWith(
      t.objectExpression(
        Object.keys(imageList).map(key =>
          t.objectProperty(t.identifier(key), getScaledSrc(key)),
        ),
      ),
    );
  };

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

  const generateDefaultTypes = (path, filename) => {
    if (filename !== nodePath.resolve(__dirname, './src/types.ts')) return;

    outputFileSync(
      nodePath.resolve(__dirname, './defaultTypes.tsx'),
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
      cache.useGetImage = false;
      cache.images = [];
    },
    visitor: {
      ImportDeclaration: path => {
        if (
          !t.isLiteral(path.get('source').node, { value: '@meepshop/images' })
        )
          return;

        path.get('specifiers').forEach(specifier => {
          if (t.isImportSpecifier(specifier)) {
            const key = specifier.get('imported').node.name;
            const localKey = specifier.get('local').node.name;

            if (/_react$/.test(key)) replaceWithComponent(path, localKey, key);
            else {
              cache.useGetImage = true;
              cache.images.push({ key, localKey });
            }
          }

          if (t.isImportNamespaceSpecifier(specifier)) {
            cache.useGetImage = true;
            cache.images.push({
              key: hash,
              localKey: specifier.get('local').node.name,
            });
          }
        });

        path.addComments('leading', [
          { type: 'CommentBlock', value: 'compiled by @meepshop/images' },
        ]);

        if (cache.useGetImage) replaceWithGetImage(path);
        else path.remove();
      },
      ExportNamedDeclaration: path => {
        if (
          !t.isLiteral(path.get('source').node, { value: '@meepshop/images' })
        )
          return;

        path.get('specifiers').forEach(specifier => {
          if (!t.isExportSpecifier(specifier)) return;

          const key = specifier.get('local').node.name;
          const localKey = specifier.get('exported').node.name;

          if (/_react$/.test(key)) {
            replaceWithComponent(path, localKey, key);
            path
              .getNextSibling()
              .replaceWith(
                t.exportNamedDeclaration(path.getNextSibling().node, []),
              );
            return;
          }

          path.insertAfter(
            t.exportNamedDeclaration(
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.identifier(localKey),
                  t.stringLiteral(hash),
                ),
              ]),
              [],
            ),
          );

          const initPath = path
            .getNextSibling()
            .get('declaration.declarations.0.init');

          if (initPath.node.value !== hash)
            throw initPath.buildCodeFrameError(
              `init path should be hash: ${hash}`,
            );

          replaceWithImage(initPath, key);
        });

        path.addComments('leading', [
          { type: 'CommentBlock', value: 'compiled by @meepshop/images' },
        ]);
        replaceWithGetImage(path);
      },
      Identifier: path => {
        const image = cache.images.find(
          ({ localKey }) => path.node.name === localKey,
        );

        if (!image) return;

        if (image.key === hash) replaceWithAllImages(path, image.localKey);
        else replaceWithImage(path, image.key);
      },
    },
    post: ({ opts: { filename }, path }) => {
      generateDefaultTypes(path, filename);
    },
  };
});
