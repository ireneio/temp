#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { main, name } = require(path.resolve('./package.json'));
const [, workspaceName] = name.match(/(@.*)\//);

require('output-file-sync')(
  path.resolve(__dirname, 'stories/index.js'),
  `/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';${
    !['@store', '@admin'].includes(workspaceName)
      ? ''
      : `

import Provider from '@meepshop/mock-types/src/${workspaceName[1].toUpperCase()}${workspaceName.slice(
          2,
        )}Provider';
import '${workspaceName}/utils/lib/styles/base.less';
import * as resolvers from '${workspaceName}/apollo-client-resolvers';`
  }

import Wrapper from './Wrapper';

${(() => {
  if (fs.existsSync(path.resolve('./mock.ts')))
    return `import Component from '${path.resolve(main)}';
import props from '${path.resolve('./mock.ts')}';`;

  if (fs.existsSync(path.resolve('./mock.tsx')))
    return `import Component from '${path.resolve('./mock.tsx')}';

const props = {}`;

  return `import Component from '${path.resolve(main)}';

const props = {}`;
})()}${
    ['@store', '@admin'].includes(workspaceName)
      ? ''
      : `
const resolvers = undefined;
const Provider = ({ children }) => children;`
  }

storiesOf('${name}', module)
  .add('demo', () => (
    <Wrapper resolvers={resolvers}>
      <Provider>
        <Component {...props} />
      </Provider>
    </Wrapper>
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
