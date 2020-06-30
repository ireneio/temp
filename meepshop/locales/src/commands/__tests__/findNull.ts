// import
import path from 'path';

import './__ignore__/mock';
import findNull from '../findNull';

// definition
test('find null', () => {
  const repoPath = path.resolve(__dirname, '../../utils/__tests__/__ignore__');

  expect(findNull(repoPath)).toEqual({
    [path.resolve(repoPath, './meepshop/modules')]: {
      key3: ['ja_JP'],
      key4: ['en_US', 'ja_JP'],
      key5: ['zh_TW', 'en_US'],
    },
  });
});
