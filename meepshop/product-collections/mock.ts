// import
import uuid from 'uuid/v4';

// graphql typescript
import { productCollectionsFragment } from './src/__generated__/productCollectionsFragment';

// definition
export default {
  __typename: 'ProductCollectionsModule',
  id: uuid(),
  productCollectionsType: 'ORIGIN',
  percentWidth: 'WIDTH100',
  product: {
    __typename: 'Product',
    id: uuid(),
    title: {
      __typename: 'Locale',
      zh_TW: 'title', // eslint-disable-line @typescript-eslint/camelcase
    },
    galleries: null,
  },
} as productCollectionsFragment;
