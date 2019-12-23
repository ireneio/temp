#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { main, name } = require(path.resolve('./package.json'));

require('output-file-sync')(
  path.resolve(__dirname, 'story.js'),
  `/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import nextI18next from 'next-i18next';

import '${
    /@admin/.test(name) ? '@admin' : '@store'
  }/utils/lib/styles/base.less';
import MockTypes from '@meepshop/mock-types';
import * as resolvers from '${
    /@admin/.test(name) ? '@admin' : '@store'
  }/apollo-client-resolvers';

import './combined.less';
import Provider from '@meepshop/mock-types/src/${
    /@admin/.test(name) ? 'Admin' : 'Store'
  }Provider';

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
    <I18nextProvider i18n={nextI18next.i18n}>
      <MockTypes {...resolvers}>
        <Provider>
          <Component />
        </Provider>
      </MockTypes>
    </I18nextProvider>
  ));`,
);

process.env.STORYBOOK_NEXT_I18NEXT_PARENT_MODULE_FILENAME = /@admin/.test(name)
  ? 'admin/utils'
  : 'store/utils';

require('@storybook/react/standalone')({
  mode: 'dev',
  port: 14400,
  configDir: __dirname,
  ci: true,
});
