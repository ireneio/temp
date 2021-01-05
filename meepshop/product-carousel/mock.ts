// import
import uuid from 'uuid/v4';

// graphql typescript
import { ProductCarouselModuleType } from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'ProductCarouselModule' as const,
  id: uuid(),
  productCarouselType: 'BOTTOM' as ProductCarouselModuleType,
  autoPlay: false,
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    title: {
      __typename: 'Locale' as const,
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'title',
      en_US: null,
      ja_JP: null,
      vi_VN: null,
      fr_FR: null,
      es_ES: null,
      th_TH: null,
      id_ID: null,
      /* eslint-enable @typescript-eslint/camelcase */
    },
    coverImage: null,
    galleries: null,
  },
};
