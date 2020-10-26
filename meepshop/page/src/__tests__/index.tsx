// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import Page from '../index';

// definition
runTest(
  'meepshop',
  <Page storeExperiment={null}>
    <div />
  </Page>,
);
