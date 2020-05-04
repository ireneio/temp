// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import LandingPage from '../index';

// definition
runTest('meepshop', <LandingPage>{() => <div>landing page</div>}</LandingPage>);