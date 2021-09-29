// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import ThankYouPage from '../index';
import props from '../../mock';

// definition
runTest('store', <ThankYouPage {...props} />);
