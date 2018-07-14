#!/usr/bin/env node
/**
 * Use for checking need to publish
 */

const path = require('path');

const { version } = require(path.resolve(process.cwd(), './package.json'));

console.log(version === process.env.CIRCLE_TAG);
