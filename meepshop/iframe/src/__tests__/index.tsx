// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import Iframe from '../index';
import props from '../../mock';

// definition
runTest('meepshop', <Iframe {...props} />);
