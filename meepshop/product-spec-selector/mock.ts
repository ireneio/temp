/* eslint-disable @typescript-eslint/camelcase */
// typescript import
import { PropsType } from './src';

// import
import uuid from 'uuid/v4';
import { emptyFunction } from 'fbjs';

// definition
const variant = {
  __typename: 'Variant',
  id: uuid(),
  listPrice: 399,
  suggestedPrice: 365,
  totalPrice: 320,
  maxPurchaseLimit: 1,
  minPurchaseItems: 99,
  stock: 99,
};

const locale = {
  __typename: 'Locale',
  zh_TW: '',
  en_US: '',
  ja_JP: '',
  vi_VN: '',
  fr_FR: '',
  es_ES: '',
  th_TH: '',
  id_ID: '',
};

export default {
  product: {
    __typename: 'Product',
    id: uuid(),
    title: {
      ...locale,
      zh_TW: 'Product',
    },
    coverImage: null,
    galleries: null,
    variants: [
      {
        ...variant,
        specs: [
          {
            __typename: 'SpecValue',
            id: 'c32325d7-4b35-4b32-b08f-c281774687b8',
            specId: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
            title: { ...locale, zh_TW: 'L' },
          },
          {
            __typename: 'SpecValue',
            id: 'f3794d85-8abb-499b-9243-6ec80d8caeac',
            specId: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
            title: { ...locale, zh_TW: 'R' },
          },
        ],
      },
      {
        ...variant,
        specs: [
          {
            __typename: 'SpecValue',
            id: '24f47a61-5610-4172-8812-5fee60fe56c7',
            specId: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
            title: { ...locale, zh_TW: 'L' },
          },
          {
            __typename: 'SpecValue',
            id: '01e509f7-eda3-4f00-8450-89566a2bee32',
            specId: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
            title: { ...locale, zh_TW: 'G' },
          },
        ],
      },
    ],
    specs: [
      {
        __typename: 'SpecDefinition',
        id: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
        title: {
          ...locale,
          zh_TW: '尺寸',
        },
      },
      {
        __typename: 'SpecDefinition',
        id: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
        title: {
          ...locale,
          zh_TW: '顏色',
        },
      },
    ],
  },
  variant: {
    ...variant,
    specs: [
      {
        __typename: 'SpecValue',
        id: 'c32325d7-4b35-4b32-b08f-c281774687b8',
        specId: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
        title: { ...locale, zh_TW: 'L' },
      },
      {
        __typename: 'SpecValue',
        id: 'f3794d85-8abb-499b-9243-6ec80d8caeac',
        specId: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
        title: { ...locale, zh_TW: 'R' },
      },
    ],
  },
  unfoldedVariantsOnMobile: true,
  visible: true,
  coordinates: [0, 1],
  orderable: 'ORDERABLE',
  quantity: 1,
  addToCart: emptyFunction,
  onClose: emptyFunction,
  onChangeSpec: emptyFunction,
  onChangeQuantity: emptyFunction,
} as PropsType;
