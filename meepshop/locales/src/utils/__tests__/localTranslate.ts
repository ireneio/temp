// import
import path from 'path';

import localTranslate from '../localTranslate';

// definition
test('local translate', () => {
  expect(
    localTranslate(path.resolve(__dirname, './__ignore__'))(
      'zh_TW',
      'zh_TW',
      'ja_JP',
    ),
  ).toEqual('ja_JP');
});
