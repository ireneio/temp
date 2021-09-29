// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import SettingApps from '../index';
import props from '../../mock';

// definition
runTest('admin', <SettingApps {...props} />);
