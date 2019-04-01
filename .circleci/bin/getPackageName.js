#!/usr/bin/env node

const path = require('path');

const { name } = require(path.resolve(
  process.argv[2] || process.cwd(),
  './package.json',
));

console.log(name === '@admin/server' ? 'next-admin' : 'next-store');
