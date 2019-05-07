import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';
import * as resolvers from '@admin/apollo-client-resolvers';

import Dashboard from '../index';

runTest(<Dashboard namespacesRequired={['common', 'dashboard']} />, resolvers);
