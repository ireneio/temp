// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { WishlistProductMock } from './__generated__/WishlistProductMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment WishlistProductMock on WishlistProduct {
    id
    productId
    title {
      zh_TW
    }
    coverImage {
      src
    }
    isAvailableForSale
  }
`;

export default mock.add<WishlistProductMock>('WishlistProduct', [
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
      src:
        'https://gc.meepcloud.com/meepshop/33dbb0c7-11d5-4912-b4f6-b8ab80cc495b/files/63d07c82-bfdd-485d-9af1-0ffb8f004f1d.jpeg',
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
      src: null,
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
