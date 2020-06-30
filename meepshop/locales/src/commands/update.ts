// typescript
import { DataType } from '../utils/walker';

// import
import path from 'path';

import checkKeys from './checkKeys';
import { LOCALES } from '../constants';
import joinValue from '../utils/joinValue';
import getValue from '../utils/getValue';

// typescript definition
interface CacheType {
  [key: string]: {
    [key: string]: DataType;
  };
}

// definition
const removeValue = (data: DataType, keys: string[]): void => {
  // eslint-disable-next-line no-param-reassign
  if (keys.length === 1) delete data[keys[0]];
  else removeValue(data, keys.slice(1));
};

const sortKeys = (targetData: DataType, referenceData: DataType): DataType =>
  Object.keys(referenceData).reduce(
    (result, key) => ({
      ...result,
      [key]:
        targetData[key] instanceof Object
          ? sortKeys(
              targetData[key] as DataType,
              referenceData[key] as DataType,
            )
          : targetData[key],
    }),
    {},
  );

export default (repoPath: string): CacheType => {
  const localeKeys = Object.keys(LOCALES) as (keyof typeof LOCALES)[];
  const notMatchKeys = checkKeys(repoPath);
  const cache: CacheType = {};

  Object.keys(notMatchKeys).forEach(folderPath => {
    cache[folderPath] = {};
    localeKeys.forEach(localeKey => {
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        cache[folderPath][localeKey] = require(path.resolve(
          folderPath,
          `${localeKey}.json`,
        ));
      } catch (e) {
        cache[folderPath][localeKey] = {};
      }
    });

    localeKeys
      .filter(localeKey => localeKey !== 'zh_TW')
      .forEach(localeKey => {
        Object.keys(notMatchKeys[folderPath]).forEach(key => {
          const existingKeys = notMatchKeys[folderPath][key];
          const keys = key.split(/\./);

          if (existingKeys.includes('zh_TW'))
            cache[folderPath][localeKey] = joinValue(
              cache[folderPath][localeKey],
              keys,
              existingKeys.includes(localeKey)
                ? getValue(cache[folderPath][localeKey], keys)
                : null,
            );
          else removeValue(cache[folderPath][localeKey], keys);
        });

        cache[folderPath][localeKey] = sortKeys(
          cache[folderPath][localeKey],
          cache[folderPath].zh_TW,
        );
      });
  });

  return cache;
};
