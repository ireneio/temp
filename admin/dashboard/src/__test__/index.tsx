import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import Dashboard from '../index';

runTest(<Dashboard namespacesRequired={['common', 'dashboard']} />);
