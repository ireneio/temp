// import
import { LOCALES } from '../constants';
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

  walker(repoPath, ({ folderPath, keys, locale }) => {
    const key = keys.join('.');
    const locales = [...(cache[folderPath]?.[key] || []), locale];

    if (localeKeys.every(localeKey => locales.includes(localeKey)))
      delete cache[folderPath][key];
    else
      cache[folderPath] = {
        ...cache[folderPath],
        [key]: locales,
      };

    if (Object.keys(cache[folderPath]).length === 0) delete cache[folderPath];
  });

  return cache;
};
