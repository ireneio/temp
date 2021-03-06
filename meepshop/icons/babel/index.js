// import
const fs = require('fs');
const nodePath = require('path');

const { declare } = require('@babel/helper-plugin-utils');
const { transformSync } = require('@babel/core');
const outputFileSync = require('output-file-sync');
const dirTree = require('directory-tree');
const d3 = require('d3-hierarchy');
const findCacheDir = require('find-cache-dir');

const svgPlugin = require('./svgPlugin');
const addDisplayName = require('../../../babel/addDisplayName');

// definition
const iconList = d3
  .hierarchy(
    dirTree(nodePath.resolve(__dirname, '../icons'), {
      extensions: /\.svg$/,
    }),
  )
  .leaves()
  .reduce((result, { data: { type, name, path } }) => {
    if (type === 'directory') return result;

    const key = name.replace(/\.svg$/, 'Icon');
    const iconName = `${key[0].toUpperCase()}${key.slice(1)}`;

    return {
      ...result,
      [iconName]: path,
    };
  }, {});

const generateIcon = (folder, iconName, path) => {
  if (!iconList[iconName])
    throw path.buildCodeFrameError(`Can not find icon: \`${iconName}\``);

  const content = fs
    .readFileSync(iconList[iconName].replace(/Icon$/, '.svg'), 'utf-8')
    .replace(/<\?xml version="1.0" encoding="UTF-8"\?>/, '')
    .replace(/<!-- .* -->/, '')
    .replace(/xmlns:xlink/, 'xmlns');
  const filePath = nodePath.resolve(folder, iconName.replace(/$/, '.js'));

  outputFileSync(
    filePath,
    transformSync(
      `import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

const Svg = React.memo(props => (
  ${content}
));

export default React.forwardRef((props, ref) => (
  <Icon {...props} ref={ref} component={Svg} />
));`,
      {
        filename: filePath.replace(/(lib|node_modules|\.cache)/g, 'src'),
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
        plugins: [addDisplayName, svgPlugin],
      },
    ).code,
  );
};

module.exports = declare(({ assertVersion, types: t }) => {
  assertVersion(7);

  const replaceWithIcons = path => {
    if (!t.isLiteral(path.get('source').node, { value: '@meepshop/icons' }))
      return;

    const importNamespaceSpecifier = path
      .get('specifiers')
      .find(specifier => t.isImportNamespaceSpecifier(specifier));

    if (!importNamespaceSpecifier) return;

    const cacheDir = findCacheDir({ name: 'icons', thunk: true });
    const localKey = importNamespaceSpecifier.get('local').node.name;

    Object.keys(iconList).forEach(key => {
      generateIcon(cacheDir(), key, path);
    });
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
                `Can not use \`import * as ${localKey} from '@meepshop/icons';\` in the production mode.`,
              ),
            ]),
          ),
        ),
      );
    path.replaceWith(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(localKey),
          t.objectExpression(
            Object.keys(iconList).map(key =>
              t.objectProperty(
                t.identifier(key),
                t.memberExpression(
                  t.callExpression(t.identifier('require'), [
                    t.stringLiteral(cacheDir(key)),
                  ]),
                  t.identifier('default'),
                ),
              ),
            ),
          ),
        ),
      ]),
    );
  };

  const generateIconAndDefaultTypes = (path, filename) => {
    if (filename !== nodePath.resolve(__dirname, '../src/types.tsx')) return;

    Object.keys(iconList).forEach(key => {
      generateIcon(nodePath.resolve(__dirname, '../lib'), key, path);
    });
    outputFileSync(
      nodePath.resolve(__dirname, '../lib/defaultTypes.tsx'),
      `// Only for typescript, do not import
// typescript import
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

// import
import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="64 64 896 896" />
));

const MockIcon = React.forwardRef(
  (props: AntdIconProps, ref: React.MutableRefObject<HTMLSpanElement>) => (
    <Icon {...props} ref={ref} component={Component} />
  ),
);

${Object.keys(iconList)
  .map(key => `export const ${key} = MockIcon;`)
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
    visitor: {
      ImportDeclaration: path => {
        replaceWithIcons(path);
      },
    },
    post: ({ opts: { filename }, path }) => {
      generateIconAndDefaultTypes(path, filename);
    },
  };
});
