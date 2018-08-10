import 'isomorphic-unfetch';
import chalk from 'chalk';

import cliOptions from './cliOptions';
import showInfo from './showInfo';

export default async () => {
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
          // eslint-disable-next-line global-require
          await require('@meepshop/store/src/server/server');
          break;

        default:
          throw new Error(`type error: can not find ${type} of prod server.`);
      }
    }),
  );
};
