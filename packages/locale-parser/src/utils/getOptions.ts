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
import generate from './generate';
import copy from './copy';

// typescript definition
export interface OptionsType {
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
    options: OptionsType['options'],
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
): Pick<OptionsType, 'rootFolder' | 'relative'> => {
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

const getDefaultOptions = (moduleNameOrPath: string): OptionsType => ({
  ...findRootFolder(moduleNameOrPath),
  localeName: 'en_US',
  beforeAll: emptyFunction,
  beforeEach: emptyFunction,
  run: emptyFunction.thatReturnsNull,
  afterEach: emptyFunction,
  afterAll: emptyFunction,
  end: emptyFunction,
});

export default (argv: string[]): Promise<OptionsType> =>
  new Promise((resolve, reject) => {
    const program = new commander.Command('locale-parser')
      .version(version, '-v, --version')
      .action(({ rawArgs }) => {
        reject(
          new Error(
            chalk`can not find the command: {red locale-parser ${rawArgs
              .slice(2)
              .join(' ')}}`,
          ),
        );
      });

    program
      .command('translate')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to translate the locales files')
      .action(moduleNameOrPath => {
        resolve({
          ...getDefaultOptions(moduleNameOrPath),
          ...translate,
        });
      });

    program
      .command('find-null')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to find null in the locales files')
      .action(moduleNameOrPath => {
        resolve({
          ...getDefaultOptions(moduleNameOrPath),
          ...findNull,
        });
      });

    program
      .command('check-keys')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to check the keys in the locales files')
      .action(moduleNameOrPath => {
        resolve({
          ...getDefaultOptions(moduleNameOrPath),
          ...checkKeys,
        });
      });

    program
      .command('generate')
      .arguments('<root-folder>')
      .usage(chalk`{green <root-rootFolder>}`)
      .description('use to generate the files')
      .requiredOption(
        '-o, --output-folder <folder>',
        'path to the output folder',
      )
      .option(
        '-t, --type <type>',
        'the type of the output file(json or csv) [default: json]',
      )
      .action((moduleNameOrPath, { outputFolder, type }) => {
        resolve({
          ...getDefaultOptions(moduleNameOrPath),
          ...generate,
          options: {
            outputFolder,
            type,
          },
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
          ...getDefaultOptions(moduleNameOrPath),
          ...copy,
          localeName: 'zh_TW',
          options: {
            relativePath,
          },
        });
      });

    if (argv.length === 2) program.help();
    else program.parse(argv);
  });
