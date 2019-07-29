// import
import { gql } from 'apollo-boost';

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
