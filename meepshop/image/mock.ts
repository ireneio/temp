// import
import uuid from 'uuid/v4';

// graphql typescript
import { imageFragment } from './src/gqls/__generated__/imageFragment';

// definition
export default {
  __typename: 'ImageModule',
  id: uuid(),
  image: null,
  link: {
    __typename: 'ProductsLink',
    sort: 'LATEST',
    searchKey: 'searchKey',
    retailPriceRange: {
      min: 0,
      max: 100,
    },
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  },
  width: 100,
  justifyContent: 'FLEX_START',
  alt: 'imageModule',
} as imageFragment;
