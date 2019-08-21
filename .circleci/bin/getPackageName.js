#!/usr/bin/env node

const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { name } = require(path.resolve(process.cwd(), './package.json'));
const pkgName = name === '@admin/server' ? 'next-admin' : 'next-store';

// eslint-disable-next-line no-console
if (!module.parent) console.log(pkgName);

module.exports = pkgName;
