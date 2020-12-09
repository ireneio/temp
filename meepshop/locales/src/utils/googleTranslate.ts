// typescript import
import { Page } from 'puppeteer';

// import
import { LOCALES } from '../constants';

// definition
export default async (
  referenceValue: string,
  targetLocale: keyof typeof LOCALES,
  page: Page,
): Promise<string> => {
  await page.goto(LOCALES[targetLocale]);
  await page.type('textarea', referenceValue);
  await new Promise((resolve, reject) => {
    const checking = (count: number): NodeJS.Timer =>
      setTimeout(async () => {
        if (count > 50) return reject(new Error('timeout'));

        try {
          if (await page.$('[aria-label="複製譯文"]')) return resolve();
          // eslint-disable-next-line no-empty
        } catch (e) {}

        return checking(count + 1);
      }, 100);

    checking(0);
  });

  const output = await page.$eval(
    '.JLqJ4b.ChMk0b',
    (e: HTMLElement) => e.innerText,
  );

  return output;
};
