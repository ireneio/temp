// import
import path from 'path';

import outputFileSync from 'output-file-sync';

import copy from '../copy';

// definition
describe('copy', () => {
  test.each`
    str                | existingStr      | expected
    ${'zh_TW'}         | ${'existingStr'} | ${'existingStr'}
    ${'not-found'}     | ${undefined}     | ${null}
    ${'only-in-zh_TW'} | ${undefined}     | ${null}
    ${'zh_TW'}         | ${undefined}     | ${'en_US'}
  `('run', async ({ str, existingStr, expected }) => {
    copy.beforeAll(
      __dirname,
      'locale.json',
      {},
      {
        relativePath: path.resolve(__dirname, './__ignore__/zh_TW/common.json'),
      },
    );

    expect(copy.run(['key'], str, existingStr, 'en_US')).toBe(expected);
  });

  test('afterEach', () => {
    copy.afterEach('zh_TW', {}, 'localeFilePath');

    expect(outputFileSync).toHaveBeenCalledWith('localeFilePath', '{}\n');
  });
});
