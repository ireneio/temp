// import
import path from 'path';

import outputFileSync from 'output-file-sync';

import generate from '../generate';

// definition
jest.mock('../../constants', () => ({
  /* eslint-disable @typescript-eslint/camelcase */
  LOCALES: {
    zh_TW: '',
    en_US: '',
  },
  /* eslint-enable @typescript-eslint/camelcase */
}));

const csv = `next-store@locale,,
,zh_TW,en_US
a.b.3,"str, str",str
,,
`;

/* eslint-disable @typescript-eslint/camelcase */
const json = JSON.stringify({
  'next-store@locale': [
    {
      en_US: 'str',
      zh_TW: null,
      key: 'a.b.1',
    },
    {
      en_US: null,
      zh_TW: 'str',
      key: 'a.b.2',
    },
    {
      en_US: 'str',
      zh_TW: 'str, str',
      key: 'a.b.3',
    },
  ],
});
/* eslint-enable @typescript-eslint/camelcase */

describe('generate', () => {
  describe.each`
    type
    ${'csv'}
    ${'json'}
  `('type = $type', ({ type }: { type: 'csv' | 'json' }) => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore jest mock
      outputFileSync.mockClear();
      generate.beforeAll(
        path.dirname(require.resolve('@meepshop/store')),
        'locale.json',
        {},
        { outputFolder: __dirname, type },
      );
    });

    test('run', () => {
      expect(generate.run(['a', 'b', '1'], 'str', null, 'zh_TW')).toBeNull();
      expect(generate.run(['a', 'b', '2'], null, 'str', 'zh_TW')).toBe('str');
      expect(generate.run(['a', 'b', '3'], 'str', 'str, str', 'zh_TW')).toBe(
        'str, str',
      );
    });

    test('end', () => {
      generate.afterAll();
      generate.end();

      expect(outputFileSync).toHaveBeenCalledWith(
        path.resolve(__dirname, `next-store.${type}`),
        { csv, json }[type],
      );
    });
  });
});
