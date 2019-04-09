#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const { main, name } = require(path.resolve('./package.json'));

require('output-file-sync')(
  path.resolve(__dirname, 'story.js'),
  `import React from 'react';
import { storiesOf } from '@storybook/react';

import './combined.less';
import MockTypes from '../packages/mock-types';
import Component from '${path.resolve(main)}';

${
  !fs.existsSync(path.resolve('./mock.ts'))
    ? 'const props = {}'
    : `import props from '${path.resolve('./mock.ts')}';`
}

storiesOf('${name}', module)
  .add('demo', () => (
    <MockTypes>
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
