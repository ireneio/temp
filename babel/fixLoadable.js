const nodePath = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare(({ assertVersion, types: t }) => {
  let pagesFolderPath;

  assertVersion(7);

  return {
    pre: ({ opts: { cwd } }) => {
      if (/src$/.test(cwd)) {
        pagesFolderPath = null;
        return;
      }

      // eslint-disable-next-line import/no-dynamic-require, global-require
      const { name } = require(nodePath.resolve(cwd, './package.json'));
      const [workspace, pkgName] = name.split(/\//);

      switch (workspace) {
        case '@store':
          // FIXME
          pagesFolderPath = nodePath.resolve(
            __dirname,
            '../packages/store/src/pages',
          );
          break;

        case '@admin':
          pagesFolderPath = nodePath.resolve(
            __dirname,
            '../admin/server/src/pages',
          );
          break;

        default:
          // FIXME
          pagesFolderPath =
            pkgName === 'meep-ui'
              ? nodePath.resolve(__dirname, '../packages/store/src/pages')
              : nodePath.resolve(__dirname, '../workspace/package/src/pages');
          break;
      }
    },
    visitor: {
      Identifier: path => {
        if (
          !pagesFolderPath ||
          !path.isIdentifier({ name: 'loadableGenerated' }) ||
          !path.parentPath.isProperty()
        )
          return;

        const sourcePathNode = path.parentPath.get(
          'value.properties.1.value.elements.0.left',
        );

        if (!sourcePathNode) return;

        const {
          node: { value: sourcePathStr },
        } = sourcePathNode;
        const sourcePath = sourcePathStr.replace(
          /(.*) -> /,
          (str, p1) =>
            `${nodePath.relative(
              pagesFolderPath,
              p1.replace(/src/, /lib/).replace(/\.tsx?$/, '.js'),
            )} -> `,
        );

        sourcePathNode.replaceWith(t.stringLiteral(sourcePath));
      },
    },
  };
});
