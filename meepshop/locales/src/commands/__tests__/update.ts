// import
import path from 'path';

import update from '../update';

// definition
jest.mock('../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
    ja_JP:
      'https://translate.google.com/?hl=zh-TW#view=home&op=translate&sl=en&tl=ja',
    newLocale: '',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));

test('update', () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');

  expect(update(repoPath)).toEqual({
    /* eslint-disable @typescript-eslint/camelcase */
    [path.resolve(repoPath, './meepshop/modules')]: {
      en_US: {
        key: 'en_US',
        key2: {
          key: 'en_US',
        },
        key3: 'hello',
        key4: null,
      },
      ja_JP: {
        key: 'ja_JP',
        key2: {
          key: 'ja_JP',
        },
        key3: null,
        key4: null,
      },
      zh_TW: {
        key: 'zh_TW',
        key2: {
          key: 'zh_TW',
        },
        key3: 'zh_TW',
        key4: 'zh_TW',
      },
      newLocale: {
        key: null,
        key2: {
          key: null,
        },
        key3: null,
        key4: null,
      },
    },
    /* eslint-enable @typescript-eslint/camelcase */
  });
});
