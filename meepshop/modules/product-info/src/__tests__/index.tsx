// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import ProductInfo from '../index';
import props from '../../mock';

// definition
runTest('meepshop', <ProductInfo {...props} />);
