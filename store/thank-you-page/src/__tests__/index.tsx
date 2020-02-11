// import
import React from 'react';
import Router from 'next/router';
import { ReactWrapper } from 'enzyme';

import runTest from '@meepshop/mock-types/src/runTest';

import '../../mock';

import ThankYouPage from '../index';
import styles from '../styles/index.less';

runTest(
  'store',
  <ThankYouPage />,
  (wrapper: ReactWrapper<unknown, unknown>, trackingIndex) => {
    test('return home page', () => {
      Router.push = jest.fn();
      wrapper
        .find(`.${styles.buttonRoot}`)
        .childAt(0)
        .simulate('click');

      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith('/', undefined);
    });

    if (trackingIndex[0] === 0) return;

    test('check order details', () => {
      Router.push = jest.fn();
      wrapper
        .find(`.${styles.buttonRoot}`)
        .childAt(1)
        .simulate('click');

      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith(
        `/order?orderId=${Router.query.orderId}`,
        `/order/${Router.query.orderId}`,
      );
    });
  },
);
