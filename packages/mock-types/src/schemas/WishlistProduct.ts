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
      scaledSrc {
        w60
        w120
        w240
        w480
        w720
        w960
        w1200
        w1440
        w1680
        w1920
      }
    }
    isAvailableForSale
  }
`;

const exampleImage =
  'https://gc.meepcloud.com/meepshop/33dbb0c7-11d5-4912-b4f6-b8ab80cc495b/files/63d07c82-bfdd-485d-9af1-0ffb8f004f1d.jpeg';

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
      scaledSrc: {
        __typename: 'ScaledURLs',
        w60: exampleImage,
        w120: exampleImage,
        w240: exampleImage,
        w480: exampleImage,
        w720: exampleImage,
        w960: exampleImage,
        w1200: exampleImage,
        w1440: exampleImage,
        w1680: exampleImage,
        w1920: exampleImage,
      },
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
      scaledSrc: null,
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
