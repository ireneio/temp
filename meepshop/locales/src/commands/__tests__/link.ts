// import
import fs from 'fs';
import path from 'path';

import './__ignore__/mock';
import link from '../link';

// definition
const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');
let existsSyncCount = 1;
let symlinkSyncCount = 1;

jest.mock('fs', () => ({
  readdirSync: jest.requireActual('fs').readdirSync,
  statSync: jest.requireActual('fs').statSync,
  existsSync: [
    // en_US
    true,
    true,

    // ja_JP
    true,
    true,

    // zh_TW
    false,
    false,
    true,

    true,
    true,
  ].reduce((result, value) => result.mockReturnValueOnce(value), jest.fn()),
  mkdirSync: jest.fn(),
  symlinkSync: jest.fn(),
}));

const checkLinkToPublic = (locale: string): void =>
  [
    path.dirname(require.resolve('@meepshop/store')),
    path.dirname(require.resolve('@admin/server')),
  ].forEach(targetRepoFolder => {
    const localesFolder = path.resolve(
      targetRepoFolder,
      './src/public/locales',
      locale,
    );

    expect(fs.existsSync).toHaveBeenNthCalledWith(
      existsSyncCount,
      localesFolder,
    );

    existsSyncCount += 1;

    expect(fs.symlinkSync).toHaveBeenNthCalledWith(
      symlinkSyncCount,
      path.resolve(repoPath, './meepshop/modules', `${locale}.json`),
      path.resolve(localesFolder, 'modules.json'),
    );

    symlinkSyncCount += 1;
  });

describe('link', () => {
  beforeAll(() => {
    link(repoPath);
  });

  test('check times', () => {
    expect(fs.existsSync).toHaveBeenCalledTimes(9);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(2);
    expect(fs.symlinkSync).toHaveBeenCalledTimes(7);
  });

  test.each`
    locale
    ${'en_US'}
    ${'ja_JP'}
  `('link public locales with locale = $locale', ({ locale }) => {
    checkLinkToPublic(locale);
  });

  describe('link public locales with locale = zh_TW', () => {
    test('link zh_TW.json to target package', () => {
      const targetFolder = path.dirname(require.resolve('@meepshop/modules'));

      expect(fs.existsSync).toHaveBeenNthCalledWith(
        existsSyncCount,
        targetFolder,
      );

      existsSyncCount += 1;

      expect(fs.existsSync).toHaveBeenNthCalledWith(
        existsSyncCount,
        path.dirname(targetFolder),
      );

      existsSyncCount += 1;

      expect(fs.existsSync).toHaveBeenNthCalledWith(
        existsSyncCount,
        path.dirname(path.dirname(targetFolder)),
      );

      existsSyncCount += 1;

      expect(fs.mkdirSync).toHaveBeenNthCalledWith(
        1,
        path.dirname(targetFolder),
      );
      expect(fs.mkdirSync).toHaveBeenNthCalledWith(2, targetFolder);
      expect(fs.symlinkSync).toHaveBeenNthCalledWith(
        symlinkSyncCount,
        path.resolve(repoPath, './meepshop/modules/zh_TW.json'),
        path.resolve(targetFolder, './locale.json'),
      );

      symlinkSyncCount += 1;
    });

    test('link', () => {
      checkLinkToPublic('zh_TW');
    });
  });
});
