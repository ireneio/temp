// import
import React from 'react';
import Router from 'next/router';
import { ReactWrapper } from 'enzyme';

import * as resolvers from '@store/apollo-client-resolvers';
import runTest from '@meepshop/mock-types/src/runTest';

import ThankYouPage from '../index';
import props from '../../mock';
import styles from '../styles/index.less';

runTest(
  <ThankYouPage {...props} />,
  resolvers,
  (wrapper: ReactWrapper<unknown, unknown>, trackingIndex) => {
    test('return home page', () => {
      Router.push = jest.fn();
      wrapper
        .find(`.${styles.buttonRoot}`)
        .childAt(0)
        .simulate('click');

      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith('/');
    });

    if (trackingIndex[0] === 0) return;

    test('check order details', () => {
      Router.push = jest.fn();
      wrapper
        .find(`.${styles.buttonRoot}`)
        .childAt(1)
        .simulate('click');

      expect(Router.push).toHaveBeenCalledTimes(1);
      expect(Router.push).toHaveBeenCalledWith(`/order/${props.orderId}`);
    });
  },
);
