// typescript import
import { Page } from 'puppeteer';

import { DataType } from '../utils/walker';
import { LOCALES } from '../constants';
import { CacheType as FindNullCacheType } from './findNull';

// import
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';
import puppeteer from 'puppeteer';

import joinValue from '../utils/joinValue';
import getValue from '../utils/getValue';

// typescript definition
interface CacheType {
  [key: string]: DataType;
}

// definition
export default async (
  nullFiles: FindNullCacheType,
  translate: (
    referenceValue: string,
    referenceLocale: keyof typeof LOCALES,
    targetLocale: keyof typeof LOCALES,
    page: Page,
  ) => Promise<string> | string | null,
  callback: (filePath: string, cache: DataType) => void,
  referenceLocale: keyof typeof LOCALES = 'zh_TW',
): Promise<void> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

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
        const output = await translate(
          referenceValue,
          referenceLocale,
          targetLocale,
          page,
        );

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

  await browser.close();
};
