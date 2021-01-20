// import
import mock from '../mock';

// graphql typescript
import {
  ViewerTypeEnum,
  orderUpdateActorMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<orderUpdateActorMockFragment>('OrderUpdateActor', [
  () => ({
    __typename: 'OrderUpdateActor',
    type: 'MERCHANT' as ViewerTypeEnum,
    name: null,
    email: null,
  }),
  () => ({
    __typename: 'OrderUpdateActor',
    type: 'HELPER' as ViewerTypeEnum,
    name: 'helper',
    email: 'helper@meepshop.com',
  }),
  () => ({
    __typename: 'OrderUpdateActor',
    type: 'HELPER' as ViewerTypeEnum,
    name: null,
    email: 'helper@meepshop.com',
  }),
]);
