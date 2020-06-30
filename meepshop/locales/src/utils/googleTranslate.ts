// import
import puppeteer from 'puppeteer';

import { LOCALES } from '../constants';

// definition
export default async (
  referenceValue: string,
  targetLocale: keyof typeof LOCALES,
): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(LOCALES[targetLocale]);
  await page.type('textarea', referenceValue);
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

  return output;
};
