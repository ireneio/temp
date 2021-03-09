// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'ProductInfoModule' as const,
  id: uuid(),
  drawerOnMobile: true,
  unfoldedVariantsOnMobile: true,
  unfoldedVariants: true,
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    title: {
      __typename: 'Locale' as const,
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'Product',
      en_US: '',
      ja_JP: '',
      vi_VN: '',
      fr_FR: '',
      es_ES: '',
      th_TH: '',
      id_ID: '',
      /* eslint-enable @typescript-eslint/camelcase */
    },
    description: null,
    applicableActivities: null,
    showUserPrice: null,
    variants: null,
  },
  viewer: null,
};
