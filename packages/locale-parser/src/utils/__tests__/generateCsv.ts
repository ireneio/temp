// import
import path from 'path';

import outputFileSync from 'output-file-sync';

import generateCsv from '../generateCsv';

// definition
jest.mock('../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));

describe('generate csv', () => {
  beforeAll(() => {
    generateCsv.beforeAll(
      path.dirname(require.resolve('@meepshop/store')),
      'locale.json',
    );
  });

  test('run', () => {
    expect(generateCsv.run(['a', 'b', '1'], 'str', null, 'zh_TW')).toBeNull();
    expect(generateCsv.run(['a', 'b', '2'], null, 'str', 'zh_TW')).toBe('str');
    expect(generateCsv.run(['a', 'b', '3'], 'str', 'str, str', 'zh_TW')).toBe(
      'str, str',
    );
  });

  test('end', () => {
    generateCsv.afterAll();
    generateCsv.end();

    expect(outputFileSync).toHaveBeenCalledWith(
      path.resolve(__dirname, '../../../../../locales/next-store.csv'),
      `next-store@locale,,
,zh_TW,en_US
a.b.3,"str, str",str
,,
`,
    );
  });
});
