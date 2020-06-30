// typescript import
import { DataType } from '../walker';

// import
import path from 'path';

import walker from '../walker';
import joinValue from '../joinValue';

// definition
test('walker', () => {
  const cache: {
    [key: string]: DataType;
  } = {};

  walker(
    path.resolve(__dirname, './__ignore__'),
    ({ filePath, keys, value }) => {
      cache[filePath] = joinValue(cache[filePath] || {}, keys, value);
    },
  );

  Object.keys(cache).forEach(filePath => {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    expect(cache[filePath]).toEqual(require(filePath));
  });
});
