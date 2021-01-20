// import
import path from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore jest mock
import { result } from 'puppeteer';

import './__ignore__/mock';
import findNull from '../findNull';
import translate from '../translate';
import googleTranslate from '../../utils/googleTranslate';

// definition
test('translate', async () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');
  const targetPath = path.resolve(repoPath, './meepshop/modules/ja_JP.json');

  result.mockResolvedValue('こんにちは');
  expect(
    await new Promise(resolve =>
      translate(findNull(repoPath), googleTranslate, (filePath, data) =>
        resolve({
          [filePath]: data,
        }),
      ),
    ),
  ).toEqual({
    [targetPath]: {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      ...require(targetPath),
      key3: 'こんにちは',
    },
  });
});
