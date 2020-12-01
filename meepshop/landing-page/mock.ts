/* eslint-disable @typescript-eslint/camelcase */
// typescript import
import { PropsType } from './src';

// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'LandingPageModule',
  id: uuid(),
  width: 50,
  quantity: {
    __typename: 'LandingPageModuleField',
    required: true,
  },
  invoice: {
    __typename: 'LandingPageModuleField',
    required: true,
  },
  gender: {
    __typename: 'LandingPageModuleField',
    required: true,
  },
  birthday: {
    __typename: 'LandingPageModuleField',
    required: true,
  },
  note: {
    __typename: 'LandingPageModuleField',
    required: true,
  },
  agreedMatters: 'agreedMatters',
  redirectPage: {
    __typename: 'ProductsLink',
    sort: 'LATEST',
    searchKey: 'searchKey',
    retailPriceRange: {
      __typename: 'MinMaxFloatRange',
      min: 0,
      max: 100,
    },
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: null,
  },
  product: {
    __typename: 'Product',
    id: uuid(),
    title: {
      __typename: 'Locale',
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
        __typename: 'Variant',
        id: '8f953308-134e-4c48-97c4-dfeb1f101f39',
        maxPurchaseLimit: 99,
        minPurchaseItems: 1,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue',
            id: '59a55563-5322-4016-9d91-4abf1270fe80',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: {
              __typename: 'Locale',
              zh_TW: '男生',
              en_US: '',
            },
          },
        ],
        stock: 200,
      },
      {
        __typename: 'Variant',
        id: '65650ba2-99b9-4e72-b39c-b5e232ef8102',
        maxPurchaseLimit: 99,
        minPurchaseItems: 1,
        totalPrice: 0,
        specs: [
          {
            __typename: 'SpecValue',
            id: 'd76da520-60cd-4c62-a392-08cec33d5aaa',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: {
              __typename: 'Locale',
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
        __typename: 'SpecDefinition',
        id: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
        title: {
          __typename: 'Locale',
          zh_TW: '尺寸',
          en_US: '',
        },
      },
    ],
  },
  shippableCountries: [],
  storePayments: [
    {
      __typename: 'StorePayment',
      id: uuid(),
    },
  ],
  storeShipments: [
    {
      __typename: 'StoreShipment',
      id: uuid(),
    },
  ],
  viewer: null,
} as Omit<PropsType, 'form'>;
