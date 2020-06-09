// import
import gql from 'graphql-tag';

import { storeClose } from '@meepshop/images';

import mock from '../mock';

// graphql typescript
import { ImageMock } from './__generated__/ImageMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ImageMock on Image {
    scaledSrc {
      w1920
    }
  }
`;

export default mock.add<ImageMock>('Image', [
  () => ({
    __typename: 'Image',
    scaledSrc: {
      __typename: 'ScaledURLs',
      w1920: storeClose,
    },
  }),
]);
