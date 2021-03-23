// import
import { transformSync } from '@babel/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import babel from '../../babel';

// definition
test('babel', () => {
  expect(
    transformSync(
      `[
  '@meepshop/locales/namespacesRequired',
];`,
      {
        filename: require.resolve('@meepshop/next-admin'),
        configFile: false,
        babelrc: false,
        plugins: [babel],
      },
    )?.code,
  ).toBe(`["common"];`);
});
