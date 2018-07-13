#!/usr/bin/env node
/**
 * Use for adding modules in root package.json
 */

const path = require('path');

const { dependencies, devDependencies } = require('../../package.json');
const { name: packageName } = require(path.resolve(
  process.cwd(),
  './package.json',
));

const DEFAULT_MODULES = Object.keys(dependencies);
const modules = { ...devDependencies, ...dependencies };

const otherDevDependencies = (() => {
  switch (packageName) {
    case '@meepshop/store':
      return ['next'];
    default:
      return [];
  }
})();

console.log(
  [...DEFAULT_MODULES, ...otherDevDependencies]
    .map(moduleName => `${moduleName}@${modules[moduleName]}`)
    .join(' '),
);
