// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import MemberRecipients from '../index';

// definition
runTest(<MemberRecipients dispatchAction={emptyFunction} />, resolvers);
