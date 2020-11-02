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
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 1,
    createdAt: moment().toISOString(),
    paidMessage: null,
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 2,
    createdAt: moment().toISOString(),
    paidMessage: null,
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 3,
    createdAt: moment().toISOString(),
    paidMessage: null,
  }),
]);
