// import
import mock from '../mock';

// graphql typescript
import { ViewerTypeEnum } from '../../../../__generated__/meepshop';
import { orderUpdateActorMockFragment } from './gqls/__generated__/orderUpdateActorMockFragment';

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
