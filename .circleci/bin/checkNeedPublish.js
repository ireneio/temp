#!/usr/bin/env node
/**
 * Use for checking need to publish
 */

const path = require('path');
const invariant = require('fbjs/lib/invariant');

const { version } = require(path.resolve(
  process.argv[2] || process.cwd(),
  './package.json',
));

invariant(process.env.CIRCLE_TAG, `CIRCLE_TAG can not be undefined.`);

console.log(`v${version}` === process.env.CIRCLE_TAG);
