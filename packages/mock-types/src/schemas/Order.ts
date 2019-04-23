// import
import { gql } from 'apollo-boost';
import idx from 'idx';
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
    lastEcfitRequestRecord {
      createdAt
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
    id: orderId || idx(obj, _ => _.node.id) || 'id',
    orderNo: (orderId || idx(obj, _ => _.node.id) || 'orderNo').slice(0, 8),
    status: 0,
    priceInfo: {
      __typename: 'priceObjectType',
      total: 100,
    },
    createdOn: moment().unix(),
    lastEcfitRequestRecord: {
      __typename: 'EcfitRequestRecord',
      createdAt: moment().unix(),
    },
  }),
  (obj, { orderId }) => ({
    __typename: 'Order',
    id: orderId || idx(obj, _ => _.node.id) || 'id',
    orderNo: (orderId || idx(obj, _ => _.node.id) || 'orderNo').slice(0, 8),
    status: 1,
    priceInfo: {
      __typename: 'priceObjectType',
      total: 100,
    },
    createdOn: moment().unix(),
    lastEcfitRequestRecord: {
      __typename: 'EcfitRequestRecord',
      createdAt: moment().unix(),
    },
  }),
]);
