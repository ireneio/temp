// import
import path from 'path';

import './__ignore__/mock';
import translate from '../translate';
import googleTranslate from '../../utils/googleTranslate';

// definition
test('translate', async () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');
  const targetPath = path.resolve(repoPath, './meepshop/modules/ja_JP.json');

  expect(
    await new Promise(resolve =>
      translate(repoPath, 'en_US', googleTranslate, (filePath, data) =>
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
