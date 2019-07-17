// import
import fs from 'fs';
import path from 'path';

import execa from 'execa';

// definition
(async () => {
  const { stdout } = await execa.shell('git diff origin/master --name-only');
  const files = stdout
    .split(/\n/)
    .filter((filename: string) => /\.testcafe$/.test(filename));
  const tasks = fs
    .readdirSync(__dirname)
    .filter((filename: string) => /\.testcafe$/.test(filename))
    .reverse()
    .splice(0, 10);
  // eslint-disable-next-line global-require
  await require('@meepshop/store/src/server');

  if (files.length === 0) files.push(...tasks);

  for (let index = 0; index < files.length; index += 1) {
    const task = path.basename(files[index], '.testcafe').replace(/^t/, 'T');

    try {
      // eslint-disable-next-line no-await-in-loop
      await execa.shell(`testcafe --fixture "${task}"`, {
        stdio: 'inherit',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      process.exit(1);
    }
  }

  process.exit();
})();
