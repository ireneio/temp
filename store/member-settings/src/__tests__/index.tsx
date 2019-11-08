// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';

import MemberSettings from '../index';

// definition
runTest('store', <MemberSettings dispatchAction={emptyFunction} />);
