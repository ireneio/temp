// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import ProductCollections from '../index';
import props from '../../mock';

// definition
runTest('meepshop', <ProductCollections {...props} />);
