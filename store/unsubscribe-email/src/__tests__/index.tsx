// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import UnsubscribeEmail from '../index';
import props from '../../mock';

// definition
runTest('store', <UnsubscribeEmail {...props} />);
