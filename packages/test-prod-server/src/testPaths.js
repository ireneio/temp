import fs from 'fs';
import path from 'path';

import puppeteer from 'puppeteer';
import moment from 'moment';
import chalk from 'chalk';

import cliOptions from './cliOptions';
import showInfo from './showInfo';

const screenshotDir = path.resolve(__dirname, '../screenshot');

export default async (pagePaths, cookie) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  await Promise.all(
    pagePaths.map(async pagePath => {
      const pageUrl = `http://localhost:14401${encodeURI(pagePath)}`;

      /** page setting */
      const page = await browser.newPage();

      if (cookie)
        await page.setCookie({
          ...cookie,
          url: pageUrl,
        });

      const requestUrls = [];
      const requestDone = [];
      page.on('request', request => {
        requestUrls.push(request.url());
      });

      page.on('requestfinished', request => {
        requestDone.push(request.url());
      });

      page.on('requestfailed', request => {
        requestDone.push(request.url());
      });

      /** start loading */
      const startTime = moment();
      await page.goto(pageUrl);

      let count = 0;
      while (requestUrls.length !== requestDone.length) {
        count += 1;

        if (count > 300) {
          showInfo(false, `request ${pageUrl} time out(30000ms)`);
          break;
        }

        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const responseMessage = await page.$eval('body', e => e.innerText);

      if (page.url() !== pageUrl)
        throw new Error(
          chalk`{blue {underline http://${
            cliOptions.domain
          }${pagePath}}} is redirected to {red {underline ${page
            .url()
            .replace('localhost:14401', cliOptions.domain)}}}`,
        );

      if (/Something went wrong/.test(responseMessage)) {
        showInfo(
          false,
          chalk`Load {blue {underline http://${
            cliOptions.domain
          }${pagePath}}} fail. Spend {gray ${moment().diff(startTime)}} ms`,
        );

        throw new Error(chalk`Response message
${responseMessage}`);
      }

      if (cliOptions.screenshot) {
        if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

        await page.screenshot({
          path: path.resolve(
            screenshotDir,
            `screenshot-${pagePath
              .replace(/^\/$/, '/home')
              .replace(/\//g, '-')}.png`,
          ),
          fullPage: true,
        });
      }

      showInfo(
        true,
        chalk`Load {blue {underline http://${
          cliOptions.domain
        }${pagePath}}} spend {gray ${moment().diff(startTime)}} ms`,
      );
    }),
  );
};
