const path = require('path');

const findPkgDir = require('find-pkg-dir');

module.exports = (name, filePath) => {
  const pkgDir = findPkgDir(filePath);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { name: pkgName } = require(path.resolve(pkgDir, './package.json'));

  return `${pkgName.replace(/^@/, '').replace(/\//g, '-')}__${path
    .relative(pkgDir, filePath)
    .replace(/(src\/|styles\/)/g, '')
    .replace(/\//g, '-')
    .replace(/\.less$/, '')}__${name}`;
};
