// import
import path from 'path';

import dirTree from 'directory-tree';

// definition
describe('check pages has namespacesRequired', () => {
  dirTree(
    path.resolve(__dirname, '../pages'),
    {
      extensions: /\.tsx?$/,
      exclude: [/_app.tsx/, /_document.tsx/, /_error.tsx/, /api/],
    },
    ({ path: filePath, name }) => {
      test(name, async () => {
        // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
        const { default: Component } = require(filePath);

        expect(Component.getInitialProps).toBeDefined();
        expect(
          (await Component.getInitialProps({ query: {} })).namespacesRequired,
        ).toBeDefined();
      });
    },
  );
});
