// import
import React from 'react';
import { ReactWrapper } from 'enzyme';
import { emptyFunction } from 'fbjs';

import runTest from '@meepshop/mock-types/src/runTest';

import MemberWishList from '../index';

// definition
runTest(
  'store',
  <MemberWishList dispatchAction={emptyFunction} />,
  (wrapper: ReactWrapper<unknown, unknown>) => {
    test('cancel button click', () => {
      const cancelRowKey = wrapper
        .find('.ant-table-row')
        .first()
        .prop('data-row-key');

      wrapper
        .find('.anticon-close')
        .first()
        .simulate('click');

      setTimeout(() => {
        expect(
          wrapper
            .find('.ant-table-row')
            .first()
            .prop('data-row-key'),
        ).not.toBe(cancelRowKey);
      }, 1000);
    });
  },
);
