// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import Video from '../index';
import props from '../../mock';

// definition
runTest('meepshop', <Video {...props} />);
