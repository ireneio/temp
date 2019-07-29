// import
import React from 'react';

import * as resolvers from '@store/apollo-client-resolvers';
import runTest from '@meepshop/mock-types/src/runTest';

import MemberOrder from '../index';
import props from '../../mock';

runTest(<MemberOrder {...props} />, resolvers);
