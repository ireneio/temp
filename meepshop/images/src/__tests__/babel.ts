// typesciprt import
import { TransformOptions } from '@babel/core';

// import
import path from 'path';

import { transformSync, transformFileSync } from '@babel/core';
import outputFileSync from 'output-file-sync';

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

describe('babel', () => {
  test.each(testings)('%s', (content: string, expected: string) => {
    expect(transformSync(content, babelOptions)?.code).toBe(expected);
  });

  test('check output react component', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore jest mock
    expect(outputFileSync.mock.calls[0][0]).toBe(
      path.resolve(__dirname, '../../lib/dashboardCost.js'),
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
