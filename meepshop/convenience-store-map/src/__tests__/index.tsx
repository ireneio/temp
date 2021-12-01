// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';

import ConvenienceStoreMap from '../index';
import props from '../../mock';

// definition
runTest(
  'store',
  <ConvenienceStoreMap {...props} confirmStore={emptyFunction} />,
);
