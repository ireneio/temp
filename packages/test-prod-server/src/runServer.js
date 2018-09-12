import childProcess from 'child_process';

import chalk from 'chalk';

import cliOptions from './cliOptions';
import showInfo from './showInfo';

export default async () => {
  await Promise.all(
    cliOptions.types.map(async type => {
      switch (type) {
        case 'store':
          childProcess.execSync('make patch-modules');
          showInfo(
            true,
            chalk`Run store prod server at local with domain: {green ${
              cliOptions.domain
            }}`,
          );

          try {
            process.on('SIGINT', () => {
              childProcess.execSync('make recovery-patch-modules');
              process.exit();
            });

            // eslint-disable-next-line global-require
            await require('@meepshop/store/src/server/server');
          } catch (e) {
            childProcess.execSync('make recovery-patch-modules');
            throw e;
          }
          break;

        default:
          throw new Error(`type error: can not find ${type} of prod server.`);
      }
    }),
  );
};
