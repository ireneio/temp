// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ImageModuleMock } from './__generated__/ImageModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ImageModuleMock on ImageModule {
    image {
      id
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
    width
    justifyContent
    alt
  }
`;

export default mock.add<ImageModuleMock>('ImageModule', [
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: null,
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {},
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
]);
