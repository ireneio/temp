// import
import path from 'path';

import chalk from 'chalk';

import checkKeys from '../checkKeys';

// definition
jest.mock('../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
    ja_JP: '',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));

describe('check keys', () => {
  beforeEach(() => {
    checkKeys.run(['a', 'b', 'c'], 'str', 'existingStr', 'zh_TW');
  });

  test('pass', () => {
    checkKeys.run(['a', 'b', 'c'], 'str', 'existingStr', 'ja_JP');

    expect(() =>
      checkKeys.afterAll(
        path.dirname(require.resolve('@meepshop/store')),
        'locale.json',
      ),
    ).not.toThrow();
  });

  test('throw error', () => {
    checkKeys.run(['a', 'b', 'c'], 'str', undefined, 'ja_JP');

    expect(() =>
      checkKeys.afterAll(
        path.dirname(require.resolve('@meepshop/store')),
        'locale.json',
      ),
    )
      .toThrow(chalk`Keys should be the same in {green next-store@locale}, but get

${JSON.stringify(
  {
    /* eslint-disable @typescript-eslint/camelcase */
    'a.b.c': {
      en_US: true,
      zh_TW: true,
      ja_JP: false,
    },
    /* eslint-enable @typescript-eslint/camelcase */
  },
  null,
  2,
)}
`);
  });
});
