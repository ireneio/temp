// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { OrderMock } from './__generated__/OrderMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment OrderMock on Order {
    id
  }
`;

export default mock.add<OrderMock>('Order', [
  (_, { orderId }: { orderId: string }) => ({
    __typename: 'Order',
    id: orderId,
  }),
]);
