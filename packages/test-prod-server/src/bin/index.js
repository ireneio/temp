#!/usr/bin/env node

import cliOptions from '../cliOptions';
import showInfo from '../showInfo';
import runServer from '../runServer';
import testPaths from '../testPaths';
import login from '../login';

process.on('unhandledRejection', error => {
  showInfo(false, error.message);
  process.exit(1);
});

(async () => {
  await runServer();

  if ([...cliOptions.paths, ...cliOptions.memberPaths].length !== 0) {
    try {
      if (cliOptions.paths.length !== 0) await testPaths(cliOptions.paths);

      if (cliOptions.memberPaths.length !== 0)
        await testPaths(cliOptions.memberPaths, await login());
    } catch (e) {
      throw e;
    }

    process.exit();
  }
})();
