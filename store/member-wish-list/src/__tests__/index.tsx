// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import MemberWishList from '../index';

// definition
runTest('store', <MemberWishList dispatchAction={emptyFunction} />);
