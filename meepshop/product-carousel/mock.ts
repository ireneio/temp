// import
import uuid from 'uuid/v4';

// graphql typescript
import { productCarouselFragment } from './src/gqls/__generated__/productCarouselFragment';

// definition
export default {
  __typename: 'ProductCarouselModule',
  id: uuid(),
  productCarouselType: 'BOTTOM',
  autoPlay: false,
  product: {
    __typename: 'Product',
    id: uuid(),
    title: {
      __typename: 'Locale',
      zh_TW: 'title', // eslint-disable-line @typescript-eslint/camelcase
    },
    coverImage: null,
    galleries: null,
  },
} as productCarouselFragment;
