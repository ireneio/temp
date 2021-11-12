// import
const fs = require('fs');
const nodePath = require('path');

const { declare } = require('@babel/helper-plugin-utils');

// definition
const cache = {};
const SKIP_DEPENDENCIES = ['apollo', 'utils'].reduce(
  (result, name) => [
    ...result,
    `@meepshop/${name}`,
    `@store/${name}`,
    `@admin/${name}`,
  ],
  [],
);

const localeExists = name =>
  fs.existsSync(
    nodePath.resolve(__dirname, '../locales', name.replace(/^@/, '')),
  );

const findPkg = dirname => {
  if (dirname === '/') throw new Error('Could not find package.json');

  const pkgPath = nodePath.resolve(dirname, './package.json');

  if (fs.existsSync(pkgPath)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const pkg = require(pkgPath);

    if (['@meepshop/next-admin', '@meepshop/next-store'].includes(pkg.name))
      return {
        '@meepshop/next-admin': {
          name: '@admin/common',
        },
        '@meepshop/next-store': {
          name: '@store/common',
        },
      }[pkg.name];

    return pkg;
  }

  return findPkg(nodePath.dirname(dirname));
};

const getNamespaces = cwd => {
  const { name, dependencies } = findPkg(cwd);
  const namespaces = cache[name] || [
    ...(!localeExists(name)
      ? []
      : [
          ...name.split(/\//).slice(-1),
          // TODO: should remove
          ...(name !== '@store/common'
            ? []
            : [
                'activity',
                'cart',
                'ducks',
                'login',
                'order-product-list',
                'order-show-total',
                'payment-default-form-item',
                'product-list',
                'receiver-default-form-item',
                'spinner',
                'validate-mobile',
              ]),
        ]),
    ...Object.keys(dependencies || {}).reduce(
      (result, dependency) =>
        !/^@(store|admin|meepshop)\//.test(dependency) ||
        SKIP_DEPENDENCIES.includes(dependency)
          ? result
          : [...result, ...getNamespaces(require.resolve(dependency))],
      [],
    ),
  ];

  cache[name] = namespaces;

  return namespaces;
};

module.exports = declare(({ assertVersion, types: t }) => {
  assertVersion(7);
  SKIP_DEPENDENCIES.forEach(name => {
    if (localeExists(name) && name !== '@meepshop/apollo')
      throw new Error(`Could not use '${name}' locale files`);
  });

  return {
    visitor: {
      StringLiteral: (path, { filename }) => {
        const str = path.node.value;

        if (
          str !== '@meepshop/locales/namespacesRequired' ||
          !t.isArrayExpression(path.parentPath.node)
        )
          return;

        path.remove();
        path.parentPath.replaceWith(
          t.arrayExpression([
            ...path.parentPath.get('elements').map(({ node }) => node),
            ...getNamespaces(filename).reduce(
              (result, name) =>
                result.some(({ value }) => value === name)
                  ? result
                  : [...result, t.stringLiteral(name)],
              [],
            ),
          ]),
        );
      },
    },
  };
});
