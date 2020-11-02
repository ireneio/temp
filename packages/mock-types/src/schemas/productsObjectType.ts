// import
import mock from '../mock';

// graphql typescript
import { productsObjectTypeMockFragment } from './gqls/__generated__/productsObjectTypeMockFragment';

// definition
export default mock.add<productsObjectTypeMockFragment>('productsObjectType', [
  () => ({
    __typename: 'productsObjectType',
    productId: 'product id',
    type: 'gift',
    sku: 'sku',
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'title',
    },
    specs: [
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec',
        },
      },
    ],
    totalPrice: 100,
    quantity: 10,
  }),
  () => ({
    __typename: 'productsObjectType',
    productId: 'product id',
    type: 'product',
    sku: 'sku',
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'title',
    },
    specs: [
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec',
        },
      },
    ],
    totalPrice: 100,
    quantity: 10,
  }),
]);
