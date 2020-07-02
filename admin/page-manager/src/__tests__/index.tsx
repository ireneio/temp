// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import PageManager from '../index';

jest.useFakeTimers();

// definition
runTest('admin', <PageManager />);
