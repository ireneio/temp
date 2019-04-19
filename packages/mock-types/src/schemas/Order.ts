// import
import { gql } from 'apollo-boost';
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
    priceInfo {
      total
    }
    createdOn
  }
`;

export default mock.add<
  OrderMock,
  {
    node: { id: string };
  },
  { orderId: string }
>('Order', [
  (_, { orderId }) => ({
    __typename: 'Order',
    id: orderId || _.node.id,
    orderNo: (orderId || _.node.id).slice(0, 8),
    status: 0,
    priceInfo: {
      __typename: 'priceObjectType',
      total: 100,
    },
    createdOn: moment().unix(),
  }),
  (_, { orderId }) => ({
    __typename: 'Order',
    id: orderId || _.node.id,
    orderNo: (orderId || _.node.id).slice(0, 8),
    status: 1,
    priceInfo: {
      __typename: 'priceObjectType',
      total: 100,
    },
    createdOn: moment().unix(),
  }),
]);
