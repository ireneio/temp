// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@store/apollo-client-resolvers';

import MemberOrderApplicatoins from '../index';
import props from '../../mock';

// definition
runTest(<MemberOrderApplicatoins {...props} />, resolvers);
