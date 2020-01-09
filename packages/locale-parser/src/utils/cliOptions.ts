// typescript import
import { LOCALES } from '../constants';

import { LocaleType } from './localeParser';

// import
import path from 'path';

import { emptyFunction } from 'fbjs';
import commander from 'commander';
import chalk from 'chalk';

import { version } from '../../package.json';

import translate from './translate';
import findNull from './findNull';
import checkKeys from './checkKeys';
import generateCsv from './generateCsv';
import copy from './copy';

// typescript definition
export interface CliOptionsType {
  rootFolder: string;
  relative: string;
  localeName: string;
  options?: {
    [key: string]: unknown;
  };
  beforeAll: (
    rootFolder: string,
    filename: string,
    baseLocale: LocaleType,
    options: CliOptionsType['options'],
  ) => void;
  beforeEach: (
    rootFolder: string,
    filename: string,
    localeKey: keyof typeof LOCALES,
  ) => void;
  run: (
    keyChaining: string[],
    str: string | null,
    existingStr: string | null | undefined,
    localeKey: keyof typeof LOCALES,
  ) => (string | null) | Promise<string | null>;
  afterEach: (
    localeKey: keyof typeof LOCALES,
    locale: LocaleType,
    localeFilePath: string,
  ) => void;
  afterAll: (rootFolder: string, filename: string) => void;
  end: () => void;
}

// definition
const findRootFolder = (
  moduleNameOrPath: string,
): Pick<CliOptionsType, 'rootFolder' | 'relative'> => {
  try {
    return {
      rootFolder: path.dirname(require.resolve(moduleNameOrPath)),
      relative: './src/public/locales',
    };
  } catch (e) {
    return {
      rootFolder: moduleNameOrPath,
      relative: './',
    };
  }
};

export default (argv: string[]): Promise<CliOptionsType> =>
  new Promise(resolve => {
    const program = new commander.Command('locale-parser').version(
      version,
      '-v, --version',
    );

    program
      .command('translate')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to translate the locales files')
      .action(moduleNameOrPath => {
        resolve({
          ...findRootFolder(moduleNameOrPath),
          localeName: 'en_US',
          beforeAll: emptyFunction,
          beforeEach: translate.beforeEach,
          run: translate.run,
          afterEach: translate.afterEach,
          afterAll: emptyFunction,
          end: emptyFunction,
        });
      });

    program
      .command('find-null')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to find null in the locales files')
      .option('--send-glip', 'send messages to glip', false)
      .action((moduleNameOrPath, { sendGlip }) => {
        resolve({
          ...findRootFolder(moduleNameOrPath),
          localeName: 'en_US',
          options: {
            sendGlip,
          },
          beforeAll: findNull.beforeAll,
          beforeEach: emptyFunction,
          run: findNull.run,
          afterEach: findNull.afterEach,
          afterAll: findNull.afterAll,
          end: findNull.end,
        });
      });

    program
      .command('check-keys')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to check the keys in the locales files')
      .action(moduleNameOrPath => {
        resolve({
          ...findRootFolder(moduleNameOrPath),
          localeName: 'en_US',
          beforeAll: emptyFunction,
          beforeEach: emptyFunction,
          run: checkKeys.run,
          afterEach: emptyFunction,
          afterAll: checkKeys.afterAll,
          end: emptyFunction,
        });
      });

    program
      .command('generate-csv')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to generate csv files')
      .action(moduleNameOrPath => {
        resolve({
          ...findRootFolder(moduleNameOrPath),
          localeName: 'en_US',
          beforeAll: generateCsv.beforeAll,
          beforeEach: emptyFunction,
          run: generateCsv.run,
          afterEach: emptyFunction,
          afterAll: generateCsv.afterAll,
          end: generateCsv.end,
        });
      });

    program
      .command('copy')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to copy the locale files')
      .requiredOption(
        '-r, --relative-path <relative-path>',
        'path to the locale files',
      )
      .action((moduleNameOrPath, { relativePath }) => {
        resolve({
          ...findRootFolder(moduleNameOrPath),
          localeName: 'zh_TW',
          options: {
            relativePath,
          },
          beforeAll: copy.beforeAll,
          beforeEach: emptyFunction,
          run: copy.run,
          afterEach: copy.afterEach,
          afterAll: emptyFunction,
          end: emptyFunction,
        });
      });

    if (argv.length === 2) program.help();
    else program.parse(argv);
  });
