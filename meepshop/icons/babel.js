// import
const fs = require('fs');
const nodePath = require('path');

require('core-js/modules/es.string.match-all');
const { declare } = require('@babel/helper-plugin-utils');
const { transformSync } = require('@babel/core');
const outputFileSync = require('output-file-sync');
const dirTree = require('directory-tree');
const d3 = require('d3-hierarchy');
const findCacheDir = require('find-cache-dir');

// definition
const iconList = d3
  .hierarchy(
    dirTree(nodePath.resolve(__dirname, './icons'), {
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

const mergeTransform = transform => {
  const transformObj = [
    ...transform.matchAll(/([\w]+)\(([.-\d]+(,[ ]?[.-\d]+)*)\)/g),
  ].reduce((result, match) => {
    const key = match[1];
    const value = match[2];

    switch (key) {
      case 'translate': {
        const [[x], [y]] = [...value.matchAll(/([-.\d]+)/g)];

        // eslint-disable-next-line no-param-reassign
        if (!result.translate) result.translate = { x: 0, y: 0 };

        return {
          ...result,
          translate: {
            x: result.translate.x + parseInt(x, 10),
            y: result.translate.y + parseInt(y, 10),
          },
        };
      }

      default:
        return {
          ...result,
          [key]: [...(result[key] || []), `${key}(${value})`],
        };
    }
  }, {});

  return Object.keys(transformObj)
    .reduce((result, key) => {
      switch (key) {
        case 'translate': {
          const { x, y } = transformObj[key];

          return x === 0 && y === 0
            ? result
            : [...result, `translate(${x}, ${y})`];
        }

        default:
          return [...result, transformObj[key].join(' ')];
      }
    }, [])
    .join(' ');
};

const svgPlugin = declare(({ assertVersion, types: t }) => {
  assertVersion(7);

  const JSXAttribute = path => {
    switch (path.get('name').node.name) {
      case 'width':
      case 'height':
        if (
          t.isJSXIdentifier(path.parentPath.get('name').node, { name: 'svg' })
        )
          path.remove();
        break;

      case 'version':
      case 'xmlns':
      case 'id':
      case 'fill':
      case 'stroke':
      case 'stroke-width':
        path.remove();
        break;

      case 'viewBox':
        if (path.get('value').node.value === '0 0 1024 1024')
          path.get('value').replaceWith(t.stringLiteral('64 64 896 896'));
        break;

      case 'fill-rule':
        path.replaceWith(
          t.jSXAttribute(
            t.jSXIdentifier('fillRule'),
            t.stringLiteral(path.get('value').node.value),
          ),
        );
        break;

      case 'fill-opacity':
        path.replaceWith(
          t.jSXAttribute(
            t.jSXIdentifier('fillOpacity'),
            t.stringLiteral(path.get('value').node.value),
          ),
        );
        break;

      case 'transform': {
        const transform = mergeTransform(path.get('value').node.value);

        if (!transform) path.remove();
        else path.get('value').replaceWith(t.stringLiteral(transform));
        break;
      }

      default:
        break;
    }
  };

  const mergeAttributes = attributePaths =>
    attributePaths.reduce((result, attributePath) => {
      JSXAttribute(attributePath);

      if (!attributePath.node) return result;

      const attributeName = attributePath.get('name').node.name;
      const existingAttributeIndex = result.findIndex(
        prevAttribute => prevAttribute.name.name === attributeName,
      );

      if (existingAttributeIndex === -1) return [...result, attributePath.node];

      switch (attributeName) {
        case 'transform':
          attributePath
            .get('value')
            .replaceWith(
              t.stringLiteral(
                `${result[existingAttributeIndex].value.value} ${
                  attributePath.get('value').node.value
                }`,
              ),
            );
          break;

        default:
          break;
      }

      // eslint-disable-next-line no-param-reassign
      result[existingAttributeIndex] = attributePath.node;

      return result;
    }, []);

  const isComponent = path =>
    t.isJSXElement(path.node) ||
    (t.isCallExpression(path.node) &&
      t.isIdentifier(path.get('callee.object').node, { name: 'React' }) &&
      t.isIdentifier(path.get('callee.property').node, {
        name: 'createElement',
      }));

  const mergeGTag = path => {
    const childPaths = path.get('children').filter(isComponent);

    if (
      childPaths.length === 1 &&
      childPaths[0].get('openingElement.name').node.name === 'g'
    )
      mergeGTag(childPaths[0]);

    if (
      !isComponent(path.parentPath) ||
      path.parentPath.get('openingElement.name').node.name !== 'g' ||
      path.parentPath.get('children').filter(isComponent).length !== 1
    )
      return;

    const parentOpeningElementPath = path.parentPath.get('openingElement');
    const currentOpeningElementPath = path.get('openingElement');

    path.parentPath.replaceWith(
      t.jsxElement(
        t.jSXOpeningElement(
          parentOpeningElementPath.get('name').node,
          mergeAttributes([
            ...parentOpeningElementPath.get('attributes'),
            ...currentOpeningElementPath.get('attributes'),
          ]),
          currentOpeningElementPath.node.selfClosing,
        ),
        path.parentPath.get('closingElement'),
        path.get('children').map(child => child.node),
        path.node.selfClosing,
      ),
    );
  };

  return {
    visitor: {
      JSXElement: path => {
        switch (path.get('openingElement.name').node.name) {
          case 'svg':
            path
              .get('openingElement.attributes.0')
              .insertBefore(t.jSXSpreadAttribute(t.identifier('props')));
            break;

          case 'title':
          case 'desc':
            path.remove();
            break;

          case 'g':
            mergeGTag(path);
            break;

          default:
            break;
        }
      },
      JSXAttribute,
    },
  };
});

const generateIcon = (folder, iconName, path) => {
  if (!iconList[iconName])
    throw path.buildCodeFrameError(`Can not find icon: \`${iconName}\``);

  const content = fs
    .readFileSync(iconList[iconName].replace(/Icon$/, '.svg'), 'utf-8')
    .replace(/<\?xml version="1.0" encoding="UTF-8"\?>/, '')
    .replace(/<!-- .* -->/, '')
    .replace(/xmlns:xlink/, 'xmlns');

  outputFileSync(
    nodePath.resolve(folder, iconName.replace(/$/, '.js')),
    transformSync(
      `import React from 'react';
import Icon from 'antd/lib/icon';

const Component = React.memo(props => (
  ${content}
));

export default React.memo(props => (
  <Icon {...props} component={Component} />
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
        plugins: [svgPlugin],
      },
    ).code,
  );
};

module.exports = declare(({ assertVersion, types: t }) => {
  const cache = {};

  assertVersion(7);

  return {
    pre: ({ opts: { filename } }) => {
      cache.shouldSkip =
        filename !== nodePath.resolve(__dirname, './src/types.tsx');
    },
    visitor: {
      ImportDeclaration: path => {
        if (!t.isLiteral(path.get('source').node, { value: '@meepshop/icons' }))
          return;

        const cacheDir = findCacheDir({ name: 'icons', thunk: true });
        const importNamespaceSpecifier = path
          .get('specifiers')
          .find(specifier => t.isImportNamespaceSpecifier(specifier));

        if (!importNamespaceSpecifier) return;

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
                  t.memberExpression(
                    t.identifier('process'),
                    t.identifier('env'),
                  ),
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
      },
      ExportNamedDeclaration: path => {
        if (cache.shouldSkip) return;

        generateIcon(
          nodePath.resolve(__dirname, './lib'),
          path.get('declaration.declarations.0.id').node.name,
          path,
        );
      },
    },
    post: ({ path }) => {
      if (cache.shouldSkip) return;

      path.replaceWith(
        t.program([
          t.throwStatement(
            t.newExpression(t.identifier('Error'), [
              t.stringLiteral('This file is only for typescript.'),
            ]),
          ),
        ]),
      );
    },
  };
});
