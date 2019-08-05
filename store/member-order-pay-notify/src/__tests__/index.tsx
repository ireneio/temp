// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import MemberOrderPayNotify from '../index';
import props from '../../mock';

// definition
runTest(<MemberOrderPayNotify {...props} />, resolvers);
