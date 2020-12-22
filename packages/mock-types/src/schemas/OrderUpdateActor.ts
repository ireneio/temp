// import
import mock from '../mock';

// graphql typescript
import { orderUpdateActorMockFragment } from './gqls/__generated__/orderUpdateActorMockFragment';

// definition
export default mock.add<orderUpdateActorMockFragment>('OrderUpdateActor', [
  () =>
    ({
      __typename: 'OrderUpdateActor',
      type: 'MERCHANT',
      name: null,
      email: null,
    } as orderUpdateActorMockFragment),
  () =>
    ({
      __typename: 'OrderUpdateActor',
      type: 'HELPER',
      name: 'helper',
      email: 'helper@meepshop.com',
    } as orderUpdateActorMockFragment),
  () =>
    ({
      __typename: 'OrderUpdateActor',
      type: 'HELPER',
      name: null,
      email: 'helper@meepshop.com',
    } as orderUpdateActorMockFragment),
]);
