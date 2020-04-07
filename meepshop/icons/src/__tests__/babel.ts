// typesciprt import
import { TransformOptions } from '@babel/core';

// import
import path from 'path';

import { transformSync } from '@babel/core';
import outputFileSync from 'output-file-sync';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import babel from '../../babel';
import testings from './__ignore__/testings';

// definition
const babelOptions: TransformOptions = {
  filename: path.resolve(__dirname, '../types.tsx'),
  configFile: false,
  babelrc: false,
  presets: ['@babel/react'],
  plugins: [babel],
};

describe('babel', () => {
  describe('transform types', () => {
    test('babel', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore jest mock
      outputFileSync.mockClear();

      expect(
        transformSync(
          `// definition
    // Only for typescript, do not import
    export const HomePageIcon = 'icon';
    export const HomeDeliveryFilledIcon = 'icon'`,
          babelOptions,
        )?.code,
      ).toBe('throw new Error("This file is only for typescript.");');
      expect(outputFileSync).toHaveBeenCalledTimes(2);
    });

    test.each(testings)('output file: %s', (filePath, index, content) => {
      expect(outputFileSync).toHaveBeenNthCalledWith(
        index,
        filePath,
        transformSync(content, {
          ...babelOptions,
          plugins: [],
        })?.code,
      );
    });
  });

  test('transform not types', () => {
    const expected = `export default 'not transform';`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore jest mock
    outputFileSync.mockClear();

    expect(
      transformSync(expected, {
        ...babelOptions,
        filename: __filename,
      })?.code,
    ).toBe(expected);
    expect(outputFileSync).not.toHaveBeenCalled();
  });

  test('export all icons', () => {
    const result = transformSync(`import * as icons from '@meepshop/icons';`, {
      ...babelOptions,
      filename: __filename,
    })?.code;

    expect(result).toMatch(
      /HomePageIcon: require\("@meepshop\/icons\/lib\/HomePageIcon"\).default/,
    );
    expect(result).toMatch(
      /if \(process\.env\.NODE_ENV === "production"\) throw new Error\("Can not use `import \* as icons from '@meepshop\/icons';` in the production mode\."\);/,
    );
  });

  test('can not find icon key', () => {
    expect(
      () =>
        transformSync(
          `// definition
    // Only for typescript, do not import
export const notFoundKeyIcon = 'icon';`,
          babelOptions,
        )?.code,
    ).toThrow(`Can not find icon: \`notFoundKeyIcon\``);
  });
});
