// typescript import
import { LocaleType } from './localeParser';

// import
import puppeteer from 'puppeteer';
import ora from 'ora';
import chalk from 'chalk';
import outputFileSync from 'output-file-sync';

import getName from './getName';

import { LOCALES } from '../constants';

// definition
export default {
  beforeEach: (
    rootFolder: string,
    filename: string,
    localeKey: keyof typeof LOCALES,
  ) => {
    const { log } = console;

    log();
    log(
      chalk`{bgCyan  ${localeKey} }{green {bold  ${getName(
        rootFolder,
        filename,
      )}}}`,
    );
    log();
  },

  run: async (
    keyChaining: string[],
    str: string | null,
    existingStr: string | null,
    localeKey: keyof typeof LOCALES,
  ): Promise<string | null> => {
    if (existingStr) return existingStr;

    if (!str || str.match(/^[ ]+$/g)) return str;

    const spinner = ora(
      chalk`{cyan ${keyChaining.join('.')}} translate {gray ${str}}`,
    ).start();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(LOCALES[localeKey]);
    await page.type('textarea', str);
    await new Promise((resolve, reject) => {
      const checking = (count: number): NodeJS.Timer =>
        setTimeout(async () => {
          if (count > 50) return reject(new Error('timeout'));

          try {
            if (await page.$('.copybutton')) return resolve();
            // eslint-disable-next-line no-empty
          } catch (e) {}

          return checking(count + 1);
        }, 100);

      checking(0);
    });

    const output = await page.$eval(
      '.translation',
      (e: HTMLElement) => e.innerText,
    );

    await browser.close();
    spinner.succeed(
      chalk`{cyan ${keyChaining.join('.')}} ${str} {green ➜} ${output}`,
    );

    return output;
  },

  afterEach: (
    _: keyof typeof LOCALES,
    locale: LocaleType,
    localeFilePath: string,
  ) => {
    outputFileSync(localeFilePath, `${JSON.stringify(locale, null, 2)}\n`);
  },
};
