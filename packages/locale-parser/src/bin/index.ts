#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import { LOCALES } from '../constants';

import cliOptions from '../utils/cliOptions';
import localeParser from '../utils/localeParser';

// definition
process.on('unhandledRejection', err => {
  throw err;
});

(async () => {
  const {
    rootFolder,
    options,
    beforeAll,
    beforeEach,
    run,
    afterEach,
    afterAll,
    end,
  } = await cliOptions(process.argv);
  const localesFolder = path.resolve(rootFolder, './src/public/locales');
  const files = fs.readdirSync(path.resolve(localesFolder, './en_US'));

  // eslint-disable-next-line no-restricted-syntax
  for (const filename of files) {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const enUSLocale = require(path.resolve(
      localesFolder,
      './en_US',
      filename,
    ));

    beforeAll(rootFolder, filename, enUSLocale, options);

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
          enUSLocale,
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
