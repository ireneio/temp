#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import { LOCALES } from '../constants';

import getOptions from '../utils/getOptions';
import localeParser from '../utils/localeParser';

// definition
process.on('unhandledRejection', err => {
  throw err;
});

(async () => {
  const {
    rootFolder,
    relative,
    localeName,
    options,
    beforeAll,
    beforeEach,
    run,
    afterEach,
    afterAll,
    end,
  } = await getOptions(process.argv);
  const localesFolder = path.resolve(rootFolder, relative);
  const files = fs
    .readdirSync(path.resolve(localesFolder, localeName))
    .filter(filename => /\.json$/.test(filename));

  // eslint-disable-next-line no-restricted-syntax
  for (const filename of files) {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const baseLocale = require(path.resolve(
      localesFolder,
      localeName,
      filename,
    ));

    beforeAll(rootFolder, filename, baseLocale, options);

    // eslint-disable-next-line no-restricted-syntax
    for (const localeKey of Object.keys(LOCALES)) {
      const newLocaleFilePath = path.resolve(
        localesFolder,
        localeKey,
        filename,
      );
      const newLocale = !fs.existsSync(newLocaleFilePath)
        ? {}
        : // eslint-disable-next-line import/no-dynamic-require, global-require
          require(newLocaleFilePath);

      beforeEach(rootFolder, filename, localeKey as keyof typeof LOCALES);
      afterEach(
        localeKey as keyof typeof LOCALES,
        // eslint-disable-next-line no-await-in-loop
        await localeParser(
          baseLocale,
          newLocale,
          localeKey as keyof typeof LOCALES,
          run,
        ),
        newLocaleFilePath,
      );
    }

    afterAll(rootFolder, filename);
  }

  end();
})();
