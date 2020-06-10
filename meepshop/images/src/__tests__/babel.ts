// typesciprt import
import { TransformOptions } from '@babel/core';

// import
import path from 'path';

import { transformSync, transformFileSync } from '@babel/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import babel from '../../babel';
import testings from './__ignore__/testings';

// definition
const babelOptions: TransformOptions = {
  filename: __filename,
  configFile: false,
  babelrc: false,
  presets: ['@babel/react'],
  plugins: [babel],
};
const testingImportNamespaceSpecifier = `import * as images from '@meepshop/images';

export default images;`;

describe('babel', () => {
  test.each(testings)('%s', (content: string, expected: string) => {
    expect(transformSync(content, babelOptions)?.code).toBe(expected);
  });

  test(testingImportNamespaceSpecifier, () => {
    const result = transformSync(testingImportNamespaceSpecifier, babelOptions)
      ?.code;

    expect(result).toMatch(
      /dashboardCost: {\n[ ]*stage: ".*",\n[ ]*production: ".*"\n.*}/,
    );
    expect(result).toMatch(
      /if \(process\.env\.NODE_ENV === "production"\) throw new Error\("Can not use `import \* as images from '@meepshop\/images';` in the production mode\."\);/,
    );
  });

  test('transform types', () => {
    expect(
      transformFileSync(path.resolve(__dirname, '../types.ts'), babelOptions)
        ?.code,
    ).toBe('throw new Error("This file is only for typescript.");');
  });

  test('can not find image key', () => {
    expect(
      () =>
        transformSync(
          `import { notFoundKey } from '@meepshop/images';

export default notFoundKey;`,
          babelOptions,
        )?.code,
    ).toThrow('Can not find image key: `notFoundKey`');
  });
});
