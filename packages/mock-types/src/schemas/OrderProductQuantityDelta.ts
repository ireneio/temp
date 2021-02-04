// import
import mock from '../mock';

// graphql typescript
import { orderProductDeltaMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<orderProductDeltaMockFragment>(
  'OrderProductQuantityDelta',
  [
    () => ({
      __typename: 'OrderProductQuantityDelta',
      sku: 'sku',
      name: 'name',
      specs: ['A', 'B'],
      beforeQuantity: 5,
      afterQuantity: 3,
    }),
    () => ({
      __typename: 'OrderProductQuantityDelta',
      sku: null,
      name: 'name',
      specs: [],
      beforeQuantity: 3,
      afterQuantity: 5,
    }),
  ],
);
