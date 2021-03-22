// import
import { transformSync } from '@babel/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import babel from '../addDisplayName';
import testings from './__ignore__/testing';

describe('babel', () => {
  test.each(testings)('%s', (content, expected) => {
    expect(
      transformSync(content, {
        filename: __filename,
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
        plugins: [babel],
      }).code,
    ).toBe(expected);
  });
});
