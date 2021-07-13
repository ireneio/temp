// import
import uuid from 'uuid/v4';

// graphql import
import { localeFragment } from '@meepshop/types/gqls/meepshop';

// definition
const variant = {
  __typename: 'Variant' as const,
  sku: 'sku',
  listPrice: 0,
  suggestedPrice: 0,
  totalPrice: 0,
  stock: 200,
  currentMinPurchasableQty: 1,
  currentMaxPurchasableQty: 99,
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
  __typename: 'ProductInfoModule' as const,
  id: uuid(),
  unfoldedVariants: true,
  drawerOnMobile: true,
  unfoldedVariantsOnMobile: true,
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    title: getLocale('Product'),
    description: null,
    applicableActivities: null,
    showUserPrice: null,
    coverImage: null,
    variants: [
      {
        ...variant,
        id: '8f953308-134e-4c48-97c4-dfeb1f101f39',
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: '59a55563-5322-4016-9d91-4abf1270fe80',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: getLocale('男生'),
          },
        ],
      },
      {
        ...variant,
        id: '65650ba2-99b9-4e72-b39c-b5e232ef8102',
        specs: [
          {
            __typename: 'SpecValue' as const,
            id: 'd76da520-60cd-4c62-a392-08cec33d5aaa',
            specId: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
            title: getLocale('女生'),
          },
        ],
      },
    ],
    specs: [
      {
        __typename: 'SpecDefinition' as const,
        id: '9d41dedd-6d5e-430b-a30e-cac82217dd9c',
        title: getLocale('尺寸'),
      },
    ],
  },
  viewer: null,
  stockNotifications: null,
  cart: null,
};
