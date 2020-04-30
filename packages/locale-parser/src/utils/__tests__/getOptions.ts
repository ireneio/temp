// import
import path from 'path';

import { emptyFunction } from 'fbjs';

import getOptions from '../getOptions';
import translate from '../translate';

// definition
jest.spyOn(process, 'exit').mockReturnThis();

describe('get options', () => {
  test('translate', async () => {
    expect(
      await getOptions([
        'yarn',
        'locale-parser',
        'translate',
        '@meepshop/store',
      ]),
    ).toEqual({
      rootFolder: path.dirname(require.resolve('@meepshop/store')),
      relative: './src/public/locales',
      localeName: 'en_US',
      beforeAll: emptyFunction,
      beforeEach: translate.beforeEach,
      run: translate.run,
      afterEach: translate.afterEach,
      afterAll: emptyFunction,
      end: emptyFunction,
    });
  });
});
