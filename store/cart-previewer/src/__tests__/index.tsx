// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import CartPreviewer from '../index';
import props from '../../mock';

// definition
runTest('store', <CartPreviewer {...props} />);
