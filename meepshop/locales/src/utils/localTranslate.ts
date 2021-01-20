// typescript import
import { DataType } from './walker';

import { LOCALES } from '../constants';

// import
import path from 'path';

import walker from './walker';
import joinValue from './joinValue';
import getValue from './getValue';

// typescript definition
interface CacheType {
  [key: string]: DataType;
}

// definition
export default (
  referenceFolder: string,
): ((
  referenceValue: string,
  referenceLocale: keyof typeof LOCALES,
  targetLocale: keyof typeof LOCALES,
) => string | null) => {
  let cache: CacheType = {};

  walker(
    path.resolve(referenceFolder),
    ({ folderPath, keys, locale, value }) => {
      cache = joinValue(
        cache || {},
        [
          [path.relative(referenceFolder, folderPath), ...keys]
            .filter(Boolean)
            .join('.'),
          locale,
        ],
        value,
      ) as CacheType;
    },
  );

  return (
    referenceValue: string,
    _: keyof typeof LOCALES,
    targetLocale: keyof typeof LOCALES,
  ) => {
    const existingKey = Object.keys(cache).find(key =>
      Object.values(cache[key]).includes(referenceValue),
    );

    return !existingKey
      ? null
      : getValue(cache[existingKey], [targetLocale]) || null;
  };
};
