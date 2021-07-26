#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import commander from 'commander';
import execa from 'execa';

import { version } from '../../package.json';

// definition
const program = new commander.Command('types').version(
  version,
  '-v, --version',
);

program
  .command('codegen <type>')
  .description('run apollo client:codegen')
  .option('-w, --watch', 'use watch mode')
  .action((type: string, { watch }) => {
    const types = ['store', 'admin', 'meepshop', 'all'];
    const gqlsFolder = path.resolve(__dirname, '../../gqls');
    const { log } = console;

    if (!types.includes(type))
      throw new Error(`type should be the one of ${types.join(', ')}`);

    if (watch && type === 'all')
      throw new Error('Could not use watch mode with type = all');

    if (!fs.existsSync(gqlsFolder)) fs.mkdirSync(gqlsFolder);

    (type === 'all' ? types.slice(0, -1) : [type]).reduce(
      async (result, apolloType) => {
        await result;
        log(`- ${apolloType}.ts`);
        await execa(
          'apollo',
          [
            'client:codegen',
            '--target',
            'typescript',
            '--outputFlat',
            path.relative(
              process.cwd(),
              path.resolve(gqlsFolder, `./${apolloType}.ts`),
            ),
            '--customScalarsPrefix',
            'meepshop',
            '--passthroughCustomScalars',
            ...(!watch ? [] : ['--watch']),
          ],
          {
            stdio: 'inherit',
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore FIXME: next.js typescript conflict
            env: {
              APOLLO_TYPE: apolloType,
            },
          },
        );
      },
      Promise.resolve(),
    );
  });

if (process.argv.length === 2) program.help();
else program.parse(process.argv);
