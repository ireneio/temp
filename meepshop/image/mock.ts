// import
import uuid from 'uuid/v4';

// graphql typescript
import { ProductsSort, JustifyContent } from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'ImageModule' as const,
  id: uuid(),
  image: null,
  link: {
    __typename: 'ProductsLink' as const,
    sort: 'LATEST' as ProductsSort,
    searchKey: 'searchKey',
    retailPriceRange: {
      __typename: 'MinMaxFloatRange' as const,
      min: 0,
      max: 100,
    },
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: {
      __typename: 'Tracking' as const,
      name: 'tracking',
      category: null,
    },
  },
  width: 100,
  justifyContent: 'FLEX_START' as JustifyContent,
  alt: 'imageModule',
};
