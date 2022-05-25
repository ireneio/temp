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
      zh_TW: '方頭亮面牛津鞋',
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
        id: '03799620-2b53-11e8-b4bf-353b0f043f15',
        currentMinPurchasableQty: 1,
        currentMaxPurchasableQty: 99,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: '03e02020-2b53-11e8-b4bf-353b0f043f15',
            specId: '6e8ce560-e563-11e7-b76e-19976f83b1aa',
            title: {
              __typename: 'Locale' as const,
              zh_TW: '23',
              en_US: '',
            },
          },
          {
            __typename: 'SpecValue' as const,
            id: '03e02021-2b53-11e8-b4bf-353b0f043f15',
            specId: '0379962a-2b53-11e8-b4bf-353b0f043f15',
            title: {
              __typename: 'Locale' as const,
              zh_TW: 'b',
              en_US: '',
            },
          },
        ],
      },
      {
        __typename: 'Variant' as const,
        id: '03799622-2b53-11e8-b4bf-353b0f043f15',
        currentMinPurchasableQty: 1,
        currentMaxPurchasableQty: 99,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: '03e04732-2b53-11e8-b4bf-353b0f043f15',
            specId: '6e8ce560-e563-11e7-b76e-19976f83b1aa',
            title: {
              __typename: 'Locale' as const,
              zh_TW: '23.5',
              en_US: '',
            },
          },
          {
            __typename: 'SpecValue' as const,
            id: '03e04733-2b53-11e8-b4bf-353b0f043f15',
            specId: '0379962a-2b53-11e8-b4bf-353b0f043f15',
            title: {
              __typename: 'Locale' as const,
              zh_TW: 'b',
              en_US: '',
            },
          },
        ],
      },
    ],
    specs: [
      {
        __typename: 'SpecDefinition' as const,
        id: '6e8ce560-e563-11e7-b76e-19976f83b1aa',
        title: {
          __typename: 'Locale' as const,
          zh_TW: '尺寸',
          en_US: '',
        },
      },
      {
        __typename: 'SpecDefinition' as const,
        id: '0379962a-2b53-11e8-b4bf-353b0f043f15',
        title: {
          __typename: 'Locale' as const,
          zh_TW: '顏色',
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
