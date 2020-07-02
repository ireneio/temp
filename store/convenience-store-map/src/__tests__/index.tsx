// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import ConvenienceStoreMap from '../index';
import props from '../../mock';

// definition
runTest(
  'store',
  <ConvenienceStoreMap
    {...props}
    close={emptyFunction}
    confirmStore={emptyFunction}
  />,
);
