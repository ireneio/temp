// typescript import
import { PropsType } from '../index';

// import
import React from 'react';
import { Form } from 'antd';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import LandingPage from '../index';
import props from '../../mock';

// definition
const EnhancedLandingPage = Form.create<PropsType>()(LandingPage);

runTest('meepshop', <EnhancedLandingPage {...props} />);
