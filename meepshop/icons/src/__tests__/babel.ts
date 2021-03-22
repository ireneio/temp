// typesciprt import
import { TransformOptions } from '@babel/core';

// import
import path from 'path';

import { transformSync } from '@babel/core';
import outputFileSync from 'output-file-sync';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import babel from '../../babel';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore need to use js
import addDisplayName from '../../../../babel/addDisplayName';
import testings from './__ignore__/testings';

// definition
const babelOptions: TransformOptions = {
  filename: path.resolve(__dirname, '../types.tsx'),
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
      expect(outputFileSync).toHaveBeenCalled();
    });

    test.each(testings)('output file: %s', (filePath, content) => {
      expect(outputFileSync).toHaveBeenCalledWith(
        filePath,
        transformSync(content, {
          ...babelOptions,
          filename: filePath.replace(/lib/g, 'src'),
          plugins: [addDisplayName],
        })?.code,
      );
    });
  });

  test('transform not types', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore jest mock
    outputFileSync.mockClear();

    expect(
      transformSync(`export default 'not transform';`, {
        ...babelOptions,
        filename: __filename,
      })?.code,
    ).toBe(`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = 'not transform';
exports["default"] = _default;`);
    expect(outputFileSync).not.toHaveBeenCalled();
  });

  test('export all icons', () => {
    const result = transformSync(`import * as icons from '@meepshop/icons';`, {
      ...babelOptions,
      filename: __filename,
    })?.code;

    expect(result).toMatch(
      /HomePageIcon: require\(".*node_modules\/.cache\/icons\/HomePageIcon"\)\["default"\]/,
    );
    expect(result).toMatch(
      /if \(process\.env\.NODE_ENV === "production"\) throw new Error\("Can not use `import \* as icons from '@meepshop\/icons';` in the production mode\."\);/,
    );
  });
});
