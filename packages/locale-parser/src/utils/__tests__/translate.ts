// import
import path from 'path';

import chalk from 'chalk';
import outputFileSync from 'output-file-sync';

import translate from '../translate';

// definition
describe('translate', () => {
  test('beforeEach', () => {
    const mockLog = jest.fn();

    global.console.log = mockLog;
    translate.beforeEach(
      path.dirname(require.resolve('@meepshop/store')),
      'locale.json',
      'zh_TW',
    );

    expect(mockLog).toHaveBeenCalledWith(
      chalk`{bgCyan  zh_TW }{green {bold  next-store@locale}}`,
    );
  });

  test.each`
    str        | existingStr | expected
    ${'hello'} | ${null}     | ${'こんにちは'}
    ${'     '} | ${null}     | ${'     '}
    ${null}    | ${null}     | ${null}
    ${null}    | ${'hello'}  | ${'hello'}
  `('run', async ({ str, existingStr, expected }) => {
    expect(
      await translate.run(['a', 'b', 'c'], str, existingStr, 'ja_JP'),
    ).toBe(expected);
  });

  test('afterEach', () => {
    translate.afterEach('zh_TW', {}, 'localeFilePath');

    expect(outputFileSync).toHaveBeenCalledWith('localeFilePath', '{}\n');
  });
});
