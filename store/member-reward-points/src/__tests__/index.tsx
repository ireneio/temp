// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import MemberRewardPoints from '../index';

// definition
runTest(<MemberRewardPoints />, resolvers);
