import path from 'path';

import chalk from 'chalk';
import findUp from 'find-up';
import commander from 'commander';

const MODE = ['storybook', 'test'];

const DEFAULT_MODULES = [
  // TODO: parse src
  'divider',
  'draftText',
  'facebookWall',
  'googleMap',
  'iframe',
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
  .option('-w, --watch', 'Watch component modified.')
  .option(
    '-m, --mode [mode]',
    `Build mode. Can be one of [${MODE.join(', ')}] or both of them.`,
    val => val.match(/(storybook|test)/gi),
  )
  .option('--modules [modules]', 'Module names', val => val.split(','));

const {
  watch = false,
  mode = MODE,
  modules = DEFAULT_MODULES,
} = commander.parse(process.argv);

if (mode.some(val => !MODE.includes(val))) {
  commander.outputHelp(
    text => chalk`
  {red Options Error:\`--mode\` is invalid.}
${text}`,
  );
  process.exit();
}

export const shouldWatch = watch;
export const buildMode = mode;
export const buildModules = modules;
export const root = path.dirname(pkgPath);
