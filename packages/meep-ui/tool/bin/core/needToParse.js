import { root, buildModules } from './cliOptions';

export default (name, filePath) =>
  buildModules.some(moduleName =>
    new RegExp(moduleName).test(filePath.replace(`${root}/src`, '')),
  ) &&
  (/^[A-Z][a-zA-Z]*/.test(name) ||
    (name === 'index.js' && !/.*\/styles\/index.js/.test(filePath)));
