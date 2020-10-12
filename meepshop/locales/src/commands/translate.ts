// typescript import
import { DataType } from '../utils/walker';
import { LOCALES } from '../constants';
import { CacheType as FindNullCacheType } from './findNull';

// import
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import joinValue from '../utils/joinValue';
import getValue from '../utils/getValue';

// typescript definition
interface CacheType {
  [key: string]: DataType;
}

// definition
export default async (
  nullFiles: FindNullCacheType,
  referenceLocale: keyof typeof LOCALES,
  translate: (
    referenceValue: string,
    targetLocale: keyof typeof LOCALES,
  ) => Promise<string> | string | null,
  callback: (filePath: string, cache: DataType) => void,
): Promise<void> => {
  await Object.keys(nullFiles).reduce(async (result, folderPath) => {
    const nullKeys = nullFiles[folderPath];

    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const reference = require(path.resolve(
      folderPath,
      `${referenceLocale}.json`,
    ));
    const cache: CacheType = {};

    await Object.keys(nullKeys).reduce(async (subResult, key) => {
      const keys = key.split(/\./);
      const referenceValue = getValue(reference, keys);

      if (nullKeys[key].includes(referenceLocale)) {
        await subResult;
        return;
      }

      await nullKeys[key].reduce(async (finalResult, targetLocale) => {
        await finalResult;

        const targetFilePath = path.resolve(folderPath, `${targetLocale}.json`);

        if (!cache[targetFilePath])
          // eslint-disable-next-line import/no-dynamic-require, global-require
          cache[targetFilePath] = require(targetFilePath);

        const spinner = ora(
          chalk`{cyan ${key}} translate {gray [${referenceLocale}] ${referenceValue}}`,
        ).start();
        const output = await translate(referenceValue, targetLocale);

        if (!output) {
          spinner.succeed(
            chalk`{cyan ${key}} {gray [${referenceLocale}]} ${referenceValue} {green ➜} {gray [${targetLocale}]} ${output}`,
          );
          return;
        }

        cache[targetFilePath] = joinValue(cache[targetFilePath], keys, output);
        callback(targetFilePath, cache[targetFilePath]);
        spinner.succeed(
          chalk`{cyan ${key}} {gray [${referenceLocale}]} ${referenceValue} {green ➜} {gray [${targetLocale}]} ${output}`,
        );
      }, subResult);
    }, result);
  }, Promise.resolve());
};
