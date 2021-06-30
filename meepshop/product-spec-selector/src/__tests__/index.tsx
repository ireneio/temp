// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import ProductSpecSelector from '../index';
import Props from '../../mock';

// definition
runTest('meepshop', <ProductSpecSelector {...Props} />);
