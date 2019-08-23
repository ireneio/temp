#!/usr/bin/env node

const path = require('path');
const invariant = require('fbjs/lib/invariant');

// eslint-disable-next-line import/no-dynamic-require
const { version } = require(path.resolve(process.cwd(), './package.json'));

invariant(
  process.env.CIRCLE_TAG ||
    process.env.TEST_VERSION ||
    /^test-.*/.test(process.env.CIRCLE_BRANCH),
  `CIRCLE_TAG can not be undefined, or branch name must be \`test-\``,
);

// eslint-disable-next-line no-console
console.log(
  process.env.TEST_VERSION || /^test-.*/.test(process.env.CIRCLE_BRANCH)
    ? true
    : `v${version}` === process.env.CIRCLE_TAG,
);
