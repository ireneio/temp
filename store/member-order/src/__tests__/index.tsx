// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import MemberOrder from '../index';
import props from '../../mock';

runTest('store', <MemberOrder {...props} />);
