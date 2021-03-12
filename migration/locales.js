const fs = require('fs');
const path = require('path');

const prettier = require('prettier');
const { format } = require('prettier-package-json');
const outputFileSync = require('output-file-sync');
// eslint-disable-next-line import/no-extraneous-dependencies
const execa = require('execa');
// eslint-disable-next-line import/no-extraneous-dependencies
const readPkgUp = require('read-pkg-up');

const config = require('../.prettierrc');
const { version } = require('../meepshop/locales/package.json');

process.argv.slice(2).forEach(async filePath => {
  const absoluteFilePath = path.resolve(filePath);
  const content = fs
    .readFileSync(absoluteFilePath, 'utf-8')
    .replace(/@meepshop\/utils\/lib\/i18n/g, '@meepshop/locales');

  outputFileSync(
    absoluteFilePath,
    prettier.format(content, {
      ...config,
      parser: /\.tsx?/.test(filePath) ? 'typescript' : 'babel',
    }),
  );

  const { path: pkgPath } = await readPkgUp({ cwd: filePath });
  const { stdout } = await execa('git', [
    'grep',
    '-rl',
    '@meepshop/utils',
    path.dirname(pkgPath),
  ]);
  const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(pkgContent);

  if (!pkg.dependencies['@meepshop/locales'])
    pkg.dependencies['@meepshop/locales'] = `^${version}`;

  if (stdout.split(/\n/).length === 1)
    delete pkg.dependencies['@meepshop/utils'];

  outputFileSync(
    pkgPath,
    prettier.format(format(pkg), {
      ...config,
      parser: 'json',
    }),
  );

  await execa('git', ['add', absoluteFilePath, pkgPath]);
});
