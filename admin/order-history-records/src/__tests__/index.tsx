// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import OrderHistoryRecords from '../index';
import props from '../../mock';

// definition
runTest('admin', <OrderHistoryRecords {...props} />);
