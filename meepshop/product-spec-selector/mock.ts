// import
import uuid from 'uuid/v4';

// graphql import
import { localeFragment } from '@meepshop/types/gqls/meepshop';

// definition
const variant = {
  __typename: 'Variant' as const,
  id: uuid(),
  listPrice: 399,
  suggestedPrice: 365,
  totalPrice: 320,
  maxPurchaseLimit: 1,
  minPurchaseItems: 99,
  stock: 99,
};

/* eslint-disable @typescript-eslint/camelcase */
const getLocale = (zh_TW: string): localeFragment => ({
  __typename: 'Locale' as const,
  zh_TW,
  en_US: '',
  ja_JP: '',
  vi_VN: '',
  fr_FR: '',
  es_ES: '',
  th_TH: '',
  id_ID: '',
});
/* eslint-enable @typescript-eslint/camelcase */

export default {
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    title: getLocale('Product'),
    coverImage: null,
    galleries: null,
    variants: [
      {
        ...variant,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: 'c32325d7-4b35-4b32-b08f-c281774687b8',
            specId: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
            title: getLocale('L'),
          },
          {
            __typename: 'SpecValue' as const,
            id: 'f3794d85-8abb-499b-9243-6ec80d8caeac',
            specId: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
            title: getLocale('R'),
          },
        ],
      },
      {
        ...variant,
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: '24f47a61-5610-4172-8812-5fee60fe56c7',
            specId: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
            title: getLocale('L'),
          },
          {
            __typename: 'SpecValue' as const,
            id: '01e509f7-eda3-4f00-8450-89566a2bee32',
            specId: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
            title: getLocale('G'),
          },
        ],
      },
    ],
    specs: [
      {
        __typename: 'SpecDefinition' as const,
        id: '34aa9d60-a7e9-44b0-9946-c36cd8fbbbe6',
        title: getLocale('尺寸'),
      },
      {
        __typename: 'SpecDefinition' as const,
        id: '96069266-da3c-4b5a-ae06-3d6df7f7b0aa',
        title: getLocale('顏色'),
      },
    ],
  },
  unfoldedVariants: true,
};
