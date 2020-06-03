// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { productsObjectTypeMock } from './__generated__/productsObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment productsObjectTypeMock on productsObjectType {
    productId
    sku
    title {
      zh_TW
    }
    specs {
      title {
        zh_TW
      }
    }
    totalPrice
    quantity
  }
`;

export default mock.add<productsObjectTypeMock>('productsObjectType', [
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
