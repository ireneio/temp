// import
import path from 'path';

import './__ignore__/mock';
import checkKeys from '../checkKeys';

// definition
test('check keys', () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');

  expect(checkKeys(repoPath)).toEqual({
    [path.resolve(repoPath, './meepshop/modules')]: {
      key4: ['zh_TW'],
      key5: ['ja_JP'],
    },
  });
});
