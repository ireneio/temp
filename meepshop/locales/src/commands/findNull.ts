// typescript import
import { LOCALES } from '../constants';

// import
import walker from '../utils/walker';

// typescript definition
interface CacheType {
  [key: string]: {
    [key: string]: (keyof typeof LOCALES)[];
  };
}

// definition
export default (repoPath: string): CacheType => {
  const localeKeys = Object.keys(LOCALES) as (keyof typeof LOCALES)[];
  const cache: CacheType = {};

  walker(repoPath, ({ folderPath, keys, locale, value }) => {
    const key = keys.join('.');

    if (!cache[folderPath]?.[key])
      cache[folderPath] = {
        ...cache[folderPath],
        [key]: [...localeKeys],
      };

    if (!value) return;

    cache[folderPath][key] = cache[folderPath][key].filter(
      localeKey => localeKey !== locale,
    );

    if (cache[folderPath][key].length === 0) delete cache[folderPath][key];

    if (Object.keys(cache[folderPath]).length === 0) delete cache[folderPath];
  });

  return cache;
};
