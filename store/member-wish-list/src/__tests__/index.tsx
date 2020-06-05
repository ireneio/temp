// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';

import MemberWishList from '../index';

// definition
runTest('store', <MemberWishList dispatchAction={emptyFunction} />);
