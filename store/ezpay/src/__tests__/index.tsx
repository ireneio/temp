// import
import React from 'react';
import { ReactWrapper } from 'enzyme';

import runTest from '@meepshop/mock-types/src/runTest';

import Ezpay from '../index';
import props from '../../mock';
import styles from '../styles/index.less';

// definition
runTest(
  'store',
  <Ezpay {...props} />,
  (wrapper: ReactWrapper<unknown, unknown>, trackingIndex) => {
    if (trackingIndex[0] === 0) return;

    test('print button click', () => {
      window.print = jest.fn();
      wrapper.find(`.${styles.printBtn}`).simulate('click');

      expect(window.print).toHaveBeenCalledTimes(1);
    });
  },
);
