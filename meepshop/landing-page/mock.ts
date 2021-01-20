/* eslint-disable @typescript-eslint/camelcase */

// import
import uuid from 'uuid/v4';

// graphql typescript
import { ProductsSort } from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: 'LandingPageModule' as const,
  id: uuid(),
  width: 50,
  quantity: {
    __typename: 'LandingPageModuleField' as const,
    required: true,
  },
  invoice: {
    __typename: 'LandingPageModuleField' as const,
    required: true,
  },
  gender: {
    __typename: 'LandingPageModuleField' as const,
    required: true,
  },
  birthday: {
    __typename: 'LandingPageModuleField' as const,
    required: true,
  },
  note: {
    __typename: 'LandingPageModuleField' as const,
    required: true,
  },
  agreedMatters: 'agreedMatters',
  redirectPage: {
    __typename: 'ProductsLink' as const,
    sort: 'LATEST' as ProductsSort,
    searchKey: 'searchKey',
    retailPriceRange: {
      __typename: 'MinMaxFloatRange' as const,
      min: 0,
      max: 100,
    },
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: null,
  },
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    title: {
      __typename: 'Locale' as const,
      zh_TW: 'Product',
      en_US: '',
      ja_JP: '',
      vi_VN: '',
      fr_FR: '',
      es_ES: '',
      th_TH: '',
      id_ID: '',
    },
    variants: [
      {
        __typename: 'Variant' as const,
        id: '8f953308-134e-4c48-97c4-dfeb1f101f39',
        maxPurchaseLimit: 99,
        minPurchaseItems: 1,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: '59a55563-5322-4016-9d91-4abf1270fe80',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: {
              __typename: 'Locale' as const,
              zh_TW: '男生',
              en_US: '',
            },
          },
        ],
        stock: 200,
      },
      {
        __typename: 'Variant' as const,
        id: '65650ba2-99b9-4e72-b39c-b5e232ef8102',
        maxPurchaseLimit: 99,
        minPurchaseItems: 1,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: 'd76da520-60cd-4c62-a392-08cec33d5aaa',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: {
              __typename: 'Locale' as const,
              zh_TW: '女生',
              en_US: '',
            },
          },
        ],
        stock: 200,
      },
    ],
    specs: [
      {
        __typename: 'SpecDefinition' as const,
        id: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
        title: {
          __typename: 'Locale' as const,
          zh_TW: '尺寸',
          en_US: '',
        },
      },
    ],
  },
  shippableCountries: [],
  storePayments: [
    {
      __typename: 'StorePayment' as const,
      id: uuid(),
    },
  ],
  storeShipments: [
    {
      __typename: 'StoreShipment' as const,
      id: uuid(),
    },
  ],
  viewer: null,
};
