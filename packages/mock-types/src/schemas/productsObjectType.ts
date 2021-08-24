// import
import mock from '../mock';

// graphql typescript
import { productsObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productsObjectTypeMockFragment>('productsObjectType', [
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
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    retailPrice: 10,
    totalPrice: 100,
    quantity: 10,
    _error: null,
    variant: {
      __typename: 'Variant',
      currentMaxPurchasableQty: 99,
      currentMinPurchasableQty: 1,
    },
  }),
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
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    retailPrice: 10,
    totalPrice: 100,
    quantity: 10,
    _error: null,
    variant: {
      __typename: 'Variant',
      currentMaxPurchasableQty: 99,
      currentMinPurchasableQty: 1,
    },
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
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    retailPrice: 10,
    totalPrice: 100,
    quantity: 10,
    _error: '已下架',
    variant: {
      __typename: 'Variant',
      currentMaxPurchasableQty: 99,
      currentMinPurchasableQty: 1,
    },
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
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    retailPrice: 10,
    totalPrice: 100,
    quantity: 10,
    _error: null,
    variant: {
      __typename: 'Variant',
      currentMaxPurchasableQty: 0,
      currentMinPurchasableQty: 1,
    },
  }),
  () => ({
    __typename: 'productsObjectType',
    productId: null,
    type: 'product',
    sku: null,
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: null,
    },
    specs: null,
    retailPrice: null,
    totalPrice: null,
    quantity: null,
    _error: '已刪除',
    variant: null,
  }),
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
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecValue',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    retailPrice: 10,
    totalPrice: 100,
    quantity: 10,
    _error: null,
    variant: {
      __typename: 'Variant',
      currentMaxPurchasableQty: 99,
      currentMinPurchasableQty: 1,
    },
  }),
]);
