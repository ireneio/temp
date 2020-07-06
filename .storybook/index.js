#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { main, name } = require(path.resolve('./package.json'));
const [, workspaceName] = name.match(/(@.*)\//);
const upperCaseWorkspaceName = `${workspaceName[1].toUpperCase()}${workspaceName.slice(
  2,
)}`;

require('output-file-sync')(
  path.resolve(__dirname, 'stories/index.js'),
  `/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';

import '../combined.less';

import '${workspaceName}/utils/lib/styles/base.less';
import Provider from '@meepshop/mock-types/src/${upperCaseWorkspaceName}Provider';

${(() => {
  if (fs.existsSync(path.resolve('./mock.ts')))
    return `import Component from '${path.resolve(main)}';
import props from '${path.resolve('./mock.ts')}';`;

  if (fs.existsSync(path.resolve('./mock.tsx')))
    return `import Component from '${path.resolve('./mock.tsx')}';

const props = {}`;

  return `import Component from '${path.resolve(main)}';

const props = {}`;
})()}

storiesOf('${name}', module)
  .add('demo', () => (
    <Provider>
      <Component {...props} />
    </Provider>
  ));`,
);

process.env.STORYBOOK_ENV = 'dev';
process.env.NODE_ENV = 'test';

require('@storybook/react/standalone')({
  mode: 'dev',
  port: 14400,
  configDir: __dirname,
  staticDir: [
    path.resolve(__dirname, './static'),
    {
      '@store': path.resolve(__dirname, '../packages/store/src/public'),
      '@admin': path.resolve(__dirname, '../admin/server/src/public'),
      '@meepshop': path.resolve(__dirname, '../packages/store/src/public'),
    }[workspaceName],
  ],
  ci: true,
});
