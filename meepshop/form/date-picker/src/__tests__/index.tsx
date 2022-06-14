// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import DatePicker from '../DatePicker';
import props from '../../mock';

// definition
runTest('meepshop', <DatePicker {...props.datePickerProps} />);
