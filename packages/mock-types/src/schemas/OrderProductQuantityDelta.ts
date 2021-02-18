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
      specs: [
        {
          __typename: 'SpecValue',
          title: {
            __typename: 'Locale',
            // eslint-disable-next-line  @typescript-eslint/camelcase
            zh_TW: 'A',
          },
        },
        {
          __typename: 'SpecValue',
          title: {
            __typename: 'Locale',
            // eslint-disable-next-line  @typescript-eslint/camelcase
            zh_TW: 'B',
          },
        },
      ],
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
