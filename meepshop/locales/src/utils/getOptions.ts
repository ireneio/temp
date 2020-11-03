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
    | 'create'
    | 'auto-translate';
  options: {
    repoPath: string;
    [key: string]: string | undefined;
  };
}

// definition
const repoPathOptions: [string, string] = [
  '--repo-path <repoPath>',
  'the path of the repo',
];
const defaultRepoPath = path.resolve(__dirname, '../../locales');
const getDefaultRepoPath = (repoPath: string): string =>
  path.resolve(repoPath || defaultRepoPath);

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
          'generate' | 'translate' | 'create' | 'auto-translate'
        >,
      ) => {
        program
          .command(command)
          .description(
            {
              'find-null': 'find `null` in the locales files',
              'check-keys': 'check the keys in the locales files',
              link: 'link the locale files to each package',
              unlink: 'remove linked locale files in the packages',
              update: 'update the keys of the locale files',
            }[command],
          )
          .option(...repoPathOptions)
          .action(({ repoPath }) => {
            resolve({
              command,
              options: {
                repoPath: getDefaultRepoPath(repoPath),
              },
            });
          });
      },
    );

    program
      .command('translate')
      .description('translate `null` in the locales files')
      .option(...repoPathOptions)
      .option(
        '-r, --reference <reference>',
        'the reference folder to translate locales',
      )
      .action(({ repoPath, reference }) => {
        resolve({
          command: 'translate',
          options: {
            repoPath: getDefaultRepoPath(repoPath),
            reference,
          },
        });
      });

    program
      .command('generate')
      .description('generate the files in a josn file')
      .option('-o, --output-folder <folder>', 'path to the output folder')
      .action(({ outputFolder }) => {
        resolve({
          command: 'generate',
          options: {
            repoPath: defaultRepoPath,
            outputFolder,
          },
        });
      });

    program
      .command('create <package-name>')
      .description('use to create the new locale files')
      .action(packageName => {
        resolve({
          command: 'create',
          options: {
            repoPath: defaultRepoPath,
            packageName,
          },
        });
      });

    program
      .command('auto-translate <paths...>')
      .description('use to translate the locale files with git commit')
      .action(paths => {
        resolve({
          command: 'auto-translate',
          options: {
            repoPath: defaultRepoPath,
            paths: paths.join(','),
          },
        });
      });

    if (argv.length === 2) program.help();
    else program.parse(argv);
  });
