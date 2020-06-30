// typescript
import { DataType } from '../utils/walker';

// import
import path from 'path';

import walker from '../utils/walker';
import joinValue from '../utils/joinValue';

// typescript definition
interface CacheType {
  [key: string]: DataType;
}

// definition
export default (repoPath: string): CacheType => {
  const cache: CacheType = {};

  walker(repoPath, ({ folderPath, keys, locale, value }) => {
    const name = path.relative(repoPath, folderPath);

    cache[name] = joinValue(cache[name] || {}, [keys.join('.'), locale], value);
  });

  return Object.keys(cache).reduce(
    (result, name) => ({
      ...result,
      [name]: Object.keys(cache[name]).map(key => ({
        ...(cache[name][key] as { [key: string]: string }),
        key,
      })),
    }),
    {},
  );
};
