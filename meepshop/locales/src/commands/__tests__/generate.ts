// import
import path from 'path';

import './__ignore__/mock';
import generate from '../generate';

// definition
test('generate', () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');

  expect(generate(repoPath)).toEqual({
    /* eslint-disable @typescript-eslint/camelcase */
    'meepshop/modules': [
      {
        en_US: 'en_US',
        ja_JP: 'ja_JP',
        zh_TW: 'zh_TW',
        key: 'key',
      },
      {
        en_US: 'en_US',
        ja_JP: 'ja_JP',
        zh_TW: 'zh_TW',
        key: 'key2.key',
      },
      {
        en_US: 'hello',
        ja_JP: null,
        zh_TW: 'zh_TW',
        key: 'key3',
      },
      {
        ja_JP: 'ja_JP',
        key: 'key5',
      },
      {
        zh_TW: 'zh_TW',
        key: 'key4',
      },
    ],
    /* eslint-enable @typescript-eslint/camelcase */
  });
});
