const path = require('path');

const pattern = /:[\d]+:/;
const { log } = console;
const cache = [];

process.argv.slice(2).forEach(filePath => {
  if (!pattern.test(filePath)) return;

  const absoluteFilePath = path.resolve(filePath.replace(pattern, ''));

  if (cache.includes(absoluteFilePath)) return;

  cache.push(absoluteFilePath);
  log(absoluteFilePath);
});

if (cache.length !== 0) process.exit(1);
