// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';

import MemberRecipients from '../index';

// definition
runTest('store', <MemberRecipients dispatchAction={emptyFunction} />);
