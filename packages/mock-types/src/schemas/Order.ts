// import
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { orderMockFragment } from './gqls/__generated__/orderMockFragment';

// definition
export default mock.add<
  orderMockFragment,
  {
    node: { id: string };
  },
  { orderId: string }
>('Order', [
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 0,
    createdAt: moment().toISOString(),
    paidMessage: [
      {
        __typename: 'PaidMessageObject',
        note: 'paid message',
      },
    ],
    orderHistoryRecords: [
      {
        __typename: 'OrderHistoryRecord',
        productsChangeDelta: [
          {
            __typename: 'OrderProductDelta',
          },
          {
            __typename: 'OrderProductDelta',
          },
          {
            __typename: 'OrderProductDelta',
          },
        ],
        productsAmountDelta: {
          __typename: 'PriceDelta',
        },
        adjustAmountDelta: null,
      },
      {
        __typename: 'OrderHistoryRecord',
        productsChangeDelta: [],
        productsAmountDelta: null,
        adjustAmountDelta: {
          __typename: 'PriceDelta',
        },
      },
      ...[].constructor.apply({}, new Array(30)).fill({
        __typename: 'OrderHistoryRecord',
      }),
    ],
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 1,
    createdAt: moment().toISOString(),
    paidMessage: null,
    orderHistoryRecords: [],
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 2,
    createdAt: moment().toISOString(),
    paidMessage: null,
    orderHistoryRecords: [],
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 3,
    createdAt: moment().toISOString(),
    paidMessage: null,
    orderHistoryRecords: [],
  }),
]);
