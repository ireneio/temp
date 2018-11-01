#!/usr/bin/env node

import { patchPackages } from '../runServer';
import showInfo from '../showInfo';

process.on('unhandledRejection', error => {
  showInfo(false, error.message);
  process.exit(1);
});

(async () => {
  await patchPackages(false);
})();
