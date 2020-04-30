#! /usr/bin/env node

const path = require('path');

process.env.STORYBOOK_ENV = 'static';
process.env.NODE_ENV = 'test';

require('@storybook/react/standalone')({
  mode: 'static',
  configDir: __dirname,
  outputDir: path.resolve(__dirname, '../storybook'),
  staticDir: [path.resolve(__dirname, './static')],
});
