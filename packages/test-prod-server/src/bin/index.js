#!/usr/bin/env node

import cliOptions from '../cliOptions';
import showInfo from '../showInfo';
import runServer from '../runServer';
import testPaths from '../testPaths';
import login from '../login';

const { log } = console;

global.console.log = text => {
  if (/test-prod-server/.test(text)) log(text);
};

process.on('unhandledRejection', error => {
  showInfo(false, error?.message || error);
  process.exit(1);
});

(async () => {
  await runServer();

  if ([...cliOptions.paths, ...cliOptions.memberPaths].length !== 0) {
    if (cliOptions.paths.length !== 0) await testPaths(cliOptions.paths);

    if (cliOptions.memberPaths.length !== 0) {
      await testPaths(cliOptions.memberPaths, await login());
    }

    process.exit();
  }
})();
