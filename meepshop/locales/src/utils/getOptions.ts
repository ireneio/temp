// import
import path from 'path';

import commander from 'commander';
import chalk from 'chalk';

import { version } from '../../package.json';

// typescript definition
export interface OptionsType {
  command:
    | 'translate'
    | 'find-null'
    | 'check-keys'
    | 'generate'
    | 'link'
    | 'unlink'
    | 'update'
    | 'create';
  repoPath: string;
  options?: {
    [key: string]: string | undefined;
  };
}

// definition
export default (argv: string[]): Promise<OptionsType> =>
  new Promise((resolve, reject) => {
    const program = new commander.Command('locales')
      .version(version, '-v, --version')
      .action(({ rawArgs }) => {
        reject(
          new Error(
            chalk`can not find the command: {red locales ${rawArgs
              .slice(2)
              .join(' ')}}`,
          ),
        );
      });

    ['find-null', 'check-keys', 'link', 'unlink', 'update'].forEach(
      (
        command: Exclude<
          OptionsType['command'],
          'generate' | 'translate' | 'create'
        >,
      ) => {
        program
          .command(command)
          .arguments('[repoPath]')
          .usage(chalk`{green [repoPath]}`)
          .description(
            {
              'find-null': 'find `null` in the locales files',
              'check-keys': 'check the keys in the locales files',
              link: 'link the locale files to each package',
              unlink: 'remove linked locale files in the packages',
              update: 'update the keys of the locale files',
            }[command],
          )
          .action(repoPath => {
            resolve({
              command,
              repoPath: path.resolve(
                repoPath || path.resolve(__dirname, '../../locales'),
              ),
            });
          });
      },
    );

    program
      .command('translate')
      .arguments('[repoPath]')
      .usage(chalk`{green [repoPath]}`)
      .description('translate `null` in the locales files')
      .option(
        '-r, --reference <reference>',
        'the reference folder to translate locales',
      )
      .action((repoPath, { reference }) => {
        resolve({
          command: 'translate',
          repoPath: path.resolve(
            repoPath || path.resolve(__dirname, '../../locales'),
          ),
          options: {
            reference,
          },
        });
      });

    program
      .command('generate')
      .arguments('[repoPath]')
      .usage(chalk`{green [repoPath]}`)
      .description('generate the files in a josn file')
      .option('-o, --output-folder <folder>', 'path to the output folder')
      .action((repoPath, { outputFolder }) => {
        resolve({
          command: 'generate',
          repoPath: path.resolve(
            repoPath || path.resolve(__dirname, '../../locales'),
          ),
          options: {
            outputFolder,
          },
        });
      });

    program
      .command('create')
      .arguments('[repoPath]')
      .usage(chalk`{green [repoPath]}`)
      .description('use to create the new locale files')
      .requiredOption(
        '-p, --package-name <packageName>',
        'the name of the new locale files',
      )
      .action((repoPath, { packageName }) => {
        resolve({
          command: 'create',
          repoPath: path.resolve(
            repoPath || path.resolve(__dirname, '../../locales'),
          ),
          options: {
            packageName,
          },
        });
      });

    if (argv.length === 2) program.help();
    else program.parse(argv);
  });
