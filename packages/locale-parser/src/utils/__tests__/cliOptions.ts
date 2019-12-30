// import
import path from 'path';

import { emptyFunction } from 'fbjs';

import cliOptions from '../cliOptions';
import translate from '../translate';
import findNull from '../findNull';

// definition
jest.spyOn(process, 'exit').mockReturnThis();

describe('cli options', () => {
  test('translate', async () => {
    expect(
      await cliOptions([
        'yarn',
        'locale-parser',
        'translate',
        '@meepshop/store',
      ]),
    ).toEqual({
      rootFolder: path.dirname(require.resolve('@meepshop/store')),
      beforeAll: emptyFunction,
      beforeEach: translate.beforeEach,
      run: translate.run,
      afterEach: translate.afterEach,
      afterAll: emptyFunction,
      end: emptyFunction,
    });
  });

  test('find-null', async () => {
    expect(
      await cliOptions(['yarn', 'locale-parser', 'find-null', __dirname]),
    ).toEqual({
      rootFolder: __dirname,
      options: {
        sendGlip: false,
      },
      beforeAll: findNull.beforeAll,
      beforeEach: emptyFunction,
      run: findNull.run,
      afterEach: findNull.afterEach,
      afterAll: findNull.afterAll,
      end: findNull.end,
    });
  });
});
