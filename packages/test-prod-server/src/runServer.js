import path from 'path';

import chalk from 'chalk';
import execa from 'execa';

import cliOptions from './cliOptions';
import showInfo from './showInfo';

const rootDir = path.resolve(__dirname, '../../..');
const patchesDir = path.resolve(__dirname, '../patches');

export const patchPackages = async (patch = true) => {
  showInfo(true, !patch ? 'unpatch packages' : 'patch packages');

  await execa.shell(
    `git apply --ignore-whitespace ${
      !patch ? '--reverse' : ''
    } ${patchesDir}/node-fetch+2.2.0.patch`,
    {
      stdio: 'inherit',
      cwd: rootDir,
    },
  );

  await execa.shell(
    `git apply --ignore-whitespace ${
      !patch ? '--reverse' : ''
    } ${patchesDir}/koa-better-http-proxy+0.2.4.patch`,
    {
      stdio: 'inherit',
      cwd: rootDir,
    },
  );
};

export default async () => {
  process.env.NODE_ENV = 'production';
  process.env.TEST_PROD_SERVER = true;

  await patchPackages();
  await Promise.all(
    cliOptions.types.map(async type => {
      switch (type) {
        case 'store':
          showInfo(
            true,
            chalk`Run store prod server at local with domain: {green ${
              cliOptions.domain
            }}`,
          );

          try {
            process.on('SIGINT', () => {
              patchPackages(false).then(() => {
                process.exit();
              });
            });

            // eslint-disable-next-line global-require
            await require('@meepshop/store/src/server');
          } catch (e) {
            await patchPackages(false);
            throw e;
          }
          break;

        default:
          throw new Error(`type error: can not find ${type} of prod server.`);
      }
    }),
  );
};
