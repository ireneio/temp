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

invariant(
  process.env.CIRCLE_TAG ||
    process.env.TEST_VERSION ||
    /^test-.*/.test(process.env.CIRCLE_BRANCH),
  `CIRCLE_TAG can not be undefined, or branch name must be \`test-\``,
);

console.log(
  process.env.TEST_VERSION || /^test-.*/.test(process.env.CIRCLE_BRANCH)
    ? true
    : `v${version}` === process.env.CIRCLE_TAG,
);
