// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { OrderApplyListMock } from './__generated__/OrderApplyListMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment OrderApplyListMock on OrderApplyList {
    data {
      orderId
      orderProductId
      quantity
      status
    }
  }
`;

export default mock.add<OrderApplyListMock>('OrderApplyList', [
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 0,
        returnId: 'return-id-1',
        applicationType: 'return',
        applicationStatus: 0,
      },
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 0,
        returnId: 'return-id-1',
        applicationType: 'return',
        applicationStatus: 10,
      },
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 1,
        returnId: 'return-id-2',
        applicationType: 'replace',
        applicationStatus: 0,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 1,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 2,
      },
    ],
  }),
  () => ({
    __typename: 'OrderApplyList',
    data: [
      {
        __typename: 'OrderApply',
        orderId: 'order-id',
        orderProductId: 'product-id',
        quantity: 1,
        status: 3,
      },
    ],
  }),
]);
