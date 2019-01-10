import chalk from 'chalk';

import cliOptions from './cliOptions';
import showInfo from './showInfo';

export default async () => {
  process.env.NODE_ENV = 'production';

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
              process.exit();
            });

            // eslint-disable-next-line global-require
            await require('@meepshop/store/src/server');
          } catch (e) {
            throw e;
          }
          break;

        default:
          throw new Error(`type error: can not find ${type} of prod server.`);
      }
    }),
  );
};
