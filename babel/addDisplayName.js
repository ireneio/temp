const nodePath = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const { declare } = require('@babel/helper-plugin-utils');
const findPkgDir = require('find-pkg-dir');

module.exports = declare(({ assertVersion, types: t }) => {
  assertVersion(7);

  const cache = {
    exportDefaultIsTransformed: false,
  };
  const checkIfReact = path =>
    t.isMemberExpression(path.parentPath.node) &&
    t.isIdentifier(path.parentPath.get('object').node, {
      name: 'React',
    });

  const getVariableName = path => {
    if (t.isIdentifier(path.parentPath.parentPath.parentPath.get('id').node))
      return path.parentPath.parentPath.parentPath.get('id').node.name;

    if (
      t.isExportDefaultDeclaration(path.parentPath.parentPath.parentPath.node)
    )
      return 'default';

    return '';
  };

  return process.env.NODE_ENV === 'production'
    ? {}
    : {
        pre: ({ opts: { cwd } }) => {
          const pkgDir = findPkgDir(cwd);
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const { name } = require(nodePath.resolve(pkgDir, './package.json'));

          cache.pkgName = name.replace(/^@(meepshop\/)?/, '');
          cache.exportDefaultIsTransformed = false;
        },
        visitor: {
          Identifier: (
            path,
            {
              file: {
                opts: { cwd, filename },
              },
            },
          ) => {
            if (
              !['createContext', 'memo', 'forwardRef'].includes(
                path.node.name,
              ) ||
              !checkIfReact(path)
            )
              return;

            const variableName = getVariableName(path);

            if (!variableName) return;

            if (variableName === 'default') {
              if (cache.exportDefaultIsTransformed) return;

              cache.exportDefaultIsTransformed = true;
              path.parentPath.parentPath.parentPath.insertBefore(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier('main'),
                    path.parentPath.parentPath.node,
                  ),
                ]),
              );
              path.parentPath.parentPath.replaceWith(t.identifier('main'));
              return;
            }

            const displayName = `${cache.pkgName}/${nodePath
              .relative(cwd, filename)
              .replace(/\/?(src|__tests__)/, '')
              .replace(/(\/index)?\.(t|j)sx?$/, '')}/${
              ['main', 'default'].includes(variableName) ? '' : variableName
            }`
              .replace(/\//g, '-')
              .split(/-/g)
              .filter(Boolean)
              .map(str => str[0].toUpperCase() + str.slice(1))
              .join('');

            // FIXME: support for react@16, remove after react@17
            if (
              (t.isArrowFunctionExpression(
                path.parentPath.parentPath.get('arguments.0').node,
              ) ||
                t.isFunctionExpression(
                  path.parentPath.parentPath.get('arguments.0').node,
                )) &&
              !path.parentPath.parentPath.get('arguments.0.id').node &&
              path.node.name === 'memo'
            )
              path.parentPath.parentPath
                .get('arguments.0.id')
                .replaceWith(t.identifier(displayName));

            path.parentPath.parentPath.parentPath.parentPath.insertAfter(
              t.assignmentExpression(
                '=',
                t.memberExpression(
                  t.identifier(variableName),
                  t.identifier('displayName'),
                ),
                t.StringLiteral(displayName),
              ),
            );
          },
        },
      };
});
