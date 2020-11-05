#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import commander from 'commander';
import yeoman from 'yeoman-environment';

import { version } from '../../package.json';

// definition
const program = new commander.Command('generate')
  .version(version, '-v, --version')
  .arguments('<template>')
  .action((template: string) => {
    const env = yeoman.createEnv();
    const { log, error } = console;
    const templatePath = path.resolve(__dirname, '..', `${template}.js`);

    if (!fs.existsSync(templatePath)) {
      error(`can not find template: ${template}`);
      process.exit(1);
      return;
    }

    env.lookup(undefined, () => {
      env.run(templatePath, err => {
        if (err) error(err);
        else log('done');
      });
    });
  });

if (process.argv.length === 2) program.help();
else program.parse(process.argv);
