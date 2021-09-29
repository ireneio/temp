// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import PageManager from '../index';
import props from '../../mock';

jest.useFakeTimers();

// definition
runTest('admin', <PageManager {...props} />);
