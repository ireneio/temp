// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import SocialMedia from '../index';
import props from '../../mock';

// definition
runTest('meepshop', <SocialMedia {...props} />);
