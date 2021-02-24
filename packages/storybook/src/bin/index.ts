#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import commander from 'commander';
import outputFileSync from 'output-file-sync';
import storybook from '@storybook/react/standalone';
import less from 'less';

import { version } from '../../package.json';

import generateStory from '../utils/generateStory';
import generateLocales from '../utils/generateLocales';

// typescript definition
declare let process: {
  exit: (exitCode: number) => void;
  argv: string[];
  env: {
    STORYBOOK_ENV: string;
    NODE_ENV: string;
  };
};

// definition
const program = new commander.Command('storybook')
  .version(version, '-v, --version')
  .action(() => {
    program.help();
  });
const configDir = path.resolve(__dirname, '../../.storybook');

program
  .command('generate <package-names...>')
  .description('generate the package story')
  .action((packageNames: string[]) => {
    packageNames.forEach((packageName: string) => {
      if (packageName === '@meepshop/locales')
        // eslint-disable-next-line import/no-extraneous-dependencies, global-require, @typescript-eslint/no-var-requires, import/no-unresolved
        generateLocales(require('../../locales.json'));
      else generateStory(packageName);
    });
  });

program
  .command('dev <workspace>')
  .description('run dev mode')
  .action((workspace: 'store' | 'admin' | 'meepshop') => {
    process.env.STORYBOOK_ENV = 'dev';
    process.env.NODE_ENV = 'test';
    outputFileSync(path.resolve(configDir, './combined.less'), '');
    storybook({
      mode: 'dev',
      port: 14400,
      configDir,
      staticDir: [
        {
          store: path.resolve(
            require.resolve('@meepshop/next-store'),
            '../src/public',
          ),
          admin: path.resolve(
            require.resolve('@meepshop/next-admin'),
            '../src/public',
          ),
          meepshop: path.resolve(
            require.resolve('@meepshop/next-store'),
            '../src/public',
          ),
        }[workspace],
      ],
      ci: true,
    });
  });

program
  .command('build')
  .description('run build mode')
  .action(async () => {
    const outputDir = path.resolve(__dirname, '../../docs');

    process.env.STORYBOOK_ENV = 'build';
    process.env.NODE_ENV = 'test';
    await await storybook({
      mode: 'static',
      configDir,
      outputDir,
    });
    less.render(
      fs.readFileSync(path.resolve(configDir, './combined.less'), 'utf8'),
      (err: {}, output: { css: string } | undefined) => {
        if (output) {
          outputFileSync(path.resolve(outputDir, './combined.css'), output.css);
          return;
        }

        const { error } = console;

        error(err);
        process.exit(1);
      },
    );
  });

if (process.argv.length === 2) program.help();
else program.parse(process.argv);
