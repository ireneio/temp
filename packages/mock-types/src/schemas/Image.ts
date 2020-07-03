// import
import gql from 'graphql-tag';

import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

import mock from '../mock';

// graphql typescript
import { ImageMock } from './__generated__/ImageMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ImageMock on Image {
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
`;

export default mock.add<ImageMock>('Image', [
  () => ({
    __typename: 'Image',
    scaledSrc: null,
  }),
  () => ({
    __typename: 'Image',
    scaledSrc: {
      ...dashboardCost,
      __typename: 'ScaledURLs',
    },
  }),
]);