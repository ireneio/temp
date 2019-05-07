import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@admin/apollo-client-resolvers';

import OrdersEcfit from '../index';

runTest(<OrdersEcfit />, resolvers);
