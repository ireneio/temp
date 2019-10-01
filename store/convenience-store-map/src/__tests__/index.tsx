// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import ConvenienceStoreMap from '../index';
import props from '../../mock';

// definition
runTest(
  <ConvenienceStoreMap
    {...props}
    close={emptyFunction}
    confirmStore={emptyFunction}
  />,
  resolvers,
);
