// import
import React from 'react';
import Router from 'next/router';
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

    test.each`
      search                                           | expected
      ${undefined}                                     | ${[`/thankYouPage?orderId=${props.orderId}`, `/checkout/thank-you-page/${props.orderId}`]}
      ${'?redirectUrl=/redirectUrl'}                   | ${['/redirectUrl', undefined]}
      ${'?redirectUrl=/redirectUrl&redirectUrl=/test'} | ${['/redirectUrl', undefined]}
    `(
      'go back button click with querystring = `$search`',
      ({ search, expected }) => {
        Router.push = jest.fn();
        window.history.pushState({}, 'Test Title', `/checkout/ezpay${search}`);

        // window.location.search = search;
        wrapper.find(`.${styles.backBtn}`).simulate('click');

        expect(Router.push).toHaveBeenCalledTimes(1);
        expect(Router.push).toHaveBeenCalledWith(...expected);
      },
    );
  },
);
