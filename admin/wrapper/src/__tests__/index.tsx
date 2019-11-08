import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import Wrapper from '../index';

runTest(
  'admin',
  <Wrapper>
    <div>Admin View</div>
  </Wrapper>,
);
