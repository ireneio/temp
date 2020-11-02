// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { wishlistProductMockFragment } from './gqls/__generated__/wishlistProductMockFragment';

// definition
export default mock.add<wishlistProductMockFragment>('WishlistProduct', [
  () => ({
    __typename: 'WishlistProduct',
    id: uuid(),
    productId: uuid(),
    title: {
      __typename: 'Locale',
      zh_TW: 'WishlistProduct 1', // eslint-disable-line @typescript-eslint/camelcase
    },
    coverImage: {
      __typename: 'Image',
    },
    isAvailableForSale: true,
  }),
  () => ({
    __typename: 'WishlistProduct',
    id: uuid(),
    productId: uuid(),
    title: {
      __typename: 'Locale',
      zh_TW: null, // eslint-disable-line @typescript-eslint/camelcase
    },
    coverImage: {
      __typename: 'Image',
    },
    isAvailableForSale: false,
  }),
  () => ({
    __typename: 'WishlistProduct',
    id: uuid(),
    productId: uuid(),
    title: null,
    coverImage: null,
    isAvailableForSale: null,
  }),
]);
