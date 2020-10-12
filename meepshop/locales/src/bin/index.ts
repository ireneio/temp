#! /usr/bin/env node
// typescript import
import { CacheType as FindNullCacheType } from '../commands/findNull';

// import
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import outputFileSync from 'output-file-sync';

import { LOCALES } from '../constants';

import getOptions from '../utils/getOptions';
import getValue from '../utils/getValue';
import googleTranslate from '../utils/googleTranslate';
import localTranslate from '../utils/localTranslate';

import translate from '../commands/translate';
import findNull from '../commands/findNull';
import checkKeys from '../commands/checkKeys';
import generate from '../commands/generate';
import link, { linkLocaleFile } from '../commands/link';
import update from '../commands/update';

// definition
process.on('unhandledRejection', err => {
  throw err;
});

(async () => {
  const localeKeys = Object.keys(LOCALES) as (keyof typeof LOCALES)[];
  const {
    command,
    options: { repoPath, ...options },
  } = await getOptions(process.argv);
  const { log } = console;

  switch (command) {
    case 'translate': {
      const nullFiles = findNull(repoPath);

      translate(
        nullFiles,
        !options?.reference ? 'en_US' : 'zh_TW',
        !options?.reference
          ? googleTranslate
          : localTranslate(options.reference),
        (filePath, data) => {
          outputFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
        },
      );
      break;
    }

    case 'find-null': {
      const nullFiles = findNull(repoPath);
      const emptyColumns = [].constructor
        .apply({}, new Array(Object.keys(LOCALES).length))
        .join(' | ');
      const localeColumns = Object.keys(LOCALES).join('** | **');

      log(
        Object.keys(nullFiles)
          .reduce((result, filePath) => {
            const data = localeKeys.reduce(
              (localeResult, localeKey) => ({
                ...localeResult,
                // eslint-disable-next-line import/no-dynamic-require, global-require
                [localeKey]: require(path.resolve(
                  filePath,
                  `${localeKey}.json`,
                )),
              }),
              {},
            );

            return [
              ...result,
              `| ** ${path.relative(
                repoPath,
                filePath,
              )} ** | ${emptyColumns} |`,
              `|  | ** ${localeColumns} ** |`,
              ...Object.keys(nullFiles[filePath]).map(
                key =>
                  `| ** ${key} ** | ${localeKeys
                    .map(localeKey =>
                      nullFiles[filePath][key].includes(localeKey)
                        ? '待補'
                        : getValue(data, [localeKey, ...key.split(/\./g)]),
                    )
                    .join(' | ')} |`,
              ),
            ];
          }, [])
          .join('\n'),
      );
      break;
    }

    case 'check-keys': {
      const notMatchKeys = checkKeys(repoPath);

      Object.keys(notMatchKeys).forEach(folderPath => {
        log(chalk`{bgGreen {bold  ${path.relative(repoPath, folderPath)} }}`);

        Object.keys(notMatchKeys[folderPath]).forEach(key => {
          log(
            chalk`{cyan ${key}} ${localeKeys
              .filter(
                localeKey => !notMatchKeys[folderPath][key].includes(localeKey),
              )
              .join(', ')}`,
          );
        });
      });

      if (Object.keys(notMatchKeys).length !== 0) process.exit(1);
      break;
    }

    case 'generate':
      outputFileSync(
        path.resolve(options?.outputFolder || 'locales.json'),
        JSON.stringify(generate(repoPath)),
      );
      break;

    case 'link':
      link(repoPath);
      break;

    case 'unlink':
      link(repoPath, (_, linkedPath) => {
        if (fs.existsSync(linkedPath)) fs.unlinkSync(linkedPath);
      });
      break;

    case 'update': {
      const data = update(repoPath);

      Object.keys(data).forEach(folderPath => {
        Object.keys(data[folderPath]).forEach(locale => {
          outputFileSync(
            path.resolve(folderPath, `${locale}.json`),
            `${JSON.stringify(data[folderPath][locale], null, 2)}\n`,
          );
        });
      });
      break;
    }

    case 'create':
      localeKeys.forEach(localeKey => {
        const name = `${localeKey}.json`;
        const filePath = path.resolve(
          repoPath,
          `./${options?.packageName?.replace(/^@/, '')}/${name}`,
        );

        outputFileSync(filePath, '{}\n');
        linkLocaleFile(
          repoPath,
          undefined,
          filePath,
          `${localeKey}.json`,
          '.json',
        );
      });
      break;

    case 'auto-translate': {
      const nullFiles = options.paths
        ?.split(',')
        .reduce((result: FindNullCacheType, key: string) => {
          const folderPath = path.dirname(path.resolve(key));

          return result[folderPath]
            ? result
            : {
                ...result,
                ...findNull(folderPath),
              };
        }, {});

      if (!nullFiles) break;

      Object.keys(LOCALES).forEach((key: keyof typeof LOCALES) => {
        LOCALES[key] = LOCALES[key].replace(/en/, 'zh-CN');
      });
      translate(nullFiles, 'zh_TW', googleTranslate, (filePath, data) => {
        outputFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
      });
      break;
    }

    default:
      throw new Error(`can not find command: ${command}`);
  }
})();
