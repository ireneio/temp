// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import MemberOrders from '../index';

// definition
runTest(<MemberOrders />, resolvers);
