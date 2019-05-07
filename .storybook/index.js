#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const { main, name } = require(path.resolve('./package.json'));

require('output-file-sync')(
  path.resolve(__dirname, 'story.js'),
  `import React from 'react';
import { storiesOf } from '@storybook/react';

import MockTypes from '@meepshop/mock-types';
import resolvers, { initializeCache } from '${
    /@admin/.test(name) ? '@admin' : '@store'
  }/apollo-client-resolvers';

import './combined.less';
import Component from '${path.resolve(main)}';

${
  !fs.existsSync(path.resolve('./mock.ts'))
    ? 'const props = {}'
    : `import props from '${path.resolve('./mock.ts')}';`
}

storiesOf('${name}', module)
  .add('demo', () => (
    <MockTypes resolvers={resolvers} initializeCache={initializeCache}>
      <Component {...props} />
    </MockTypes>
  ));`,
);

require('@storybook/react/standalone')({
  mode: 'dev',
  port: 14400,
  configDir: __dirname,
  ci: true,
});
