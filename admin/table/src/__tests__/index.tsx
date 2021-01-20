// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import Table from '../index';
import props from '../../mock';

// definition
runTest('admin', <Table {...props} />);
