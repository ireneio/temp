// import
import uuid from 'uuid/v4';

// graphql typescript
import {
  ProductCollectionsModuleType,
  PercentWidth,
} from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'ProductCollectionsModule' as const,
  id: uuid(),
  productCollectionsType: 'ORIGIN' as ProductCollectionsModuleType,
  percentWidth: 'WIDTH100' as PercentWidth,
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
    galleries: null,
  },
};
