// import
import mock from '../mock';

// graphql typescript
import { orderProductDeltaMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<orderProductDeltaMockFragment>('OrderProductDelta', [
  () => ({
    __typename: 'OrderProductDelta',
    sku: 'sku',
    name: 'name',
    spec: 'A/B',
    beforeQuantity: 5,
    afterQuantity: 3,
  }),
  () => ({
    __typename: 'OrderProductDelta',
    sku: null,
    name: 'name',
    spec: null,
    beforeQuantity: 3,
    afterQuantity: 5,
  }),
]);
