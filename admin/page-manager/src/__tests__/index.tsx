// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import PageManager from '../index';

jest.useFakeTimers();

// definition
runTest('admin', <PageManager />);
