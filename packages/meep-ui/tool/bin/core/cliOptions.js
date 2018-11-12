import path from 'path';

import findUp from 'find-up';
import commander from 'commander';
import chalk from 'chalk';

const DEFAULT_MODULES = [
  // TODO: parse src
  'addressCascader',
  'context',
  'divider',
  'draftText',
  'facebookWall',
  'googleMap',
  'iframe',
  'link',
  'socialMedia',
  'socialThumbs',
  'unavailableComp',
  'videoCore',
];

const pkgPath = findUp.sync('package.json');
// eslint-disable-next-line import/no-dynamic-require
const { version } = require(pkgPath);

commander
  .version(version)
  .option('--watch', 'watch component modified.')
  .option('--storybook', '[mode] build storybook')
  .option('--test', '[mode] build tests')
  .option('--modules [modules]', 'Module names', val => val.split(','));

const {
  watch = false,
  storybook,
  test,
  modules = DEFAULT_MODULES,
} = commander.parse(process.argv);

const mode = [];

if (storybook) mode.push('storybook');
if (test) mode.push('test');

if (mode.length === 0) {
  commander.outputHelp(
    text => chalk`
{red Options Error: [mode] type is required.}

${text}`,
  );
  process.exit();
}

export const shouldWatch = watch;
export const buildMode = mode;
export const buildModules = modules;
export const root = path.dirname(pkgPath);
