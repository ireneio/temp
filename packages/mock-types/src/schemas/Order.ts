// import
import gql from 'graphql-tag';
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { OrderMock } from './__generated__/OrderMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment OrderMock on Order {
    id
    orderNo
    status
    createdOn
    paidMessage {
      note
    }
  }
`;

export default mock.add<
  OrderMock,
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
    createdOn: moment().unix(),
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
    createdOn: moment().unix(),
    paidMessage: null,
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 2,
    createdOn: moment().unix(),
    paidMessage: null,
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || obj?.node?.id || 'id',
    orderNo: (orderId || obj?.node?.id || 'orderNo').slice(0, 8),
    status: 3,
    createdOn: moment().unix(),
    paidMessage: null,
  }),
]);
