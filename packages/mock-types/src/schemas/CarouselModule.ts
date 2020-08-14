// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { CarouselModuleMock } from './__generated__/CarouselModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment CarouselModuleMock on CarouselModule {
    width
    autoPlay
    hoverPause
    showIndicator
    showController
    alt
  }
`;

export default mock.add<CarouselModuleMock>('CarouselModule', [
  () =>
    ({
      __typename: 'CarouselModule',
      images: null,
      width: 100,
      autoPlay: true,
      hoverPause: true,
      showIndicator: true,
      showController: true,
      alt: 'carouselModule',
    } as CarouselModuleMock),
  () =>
    ({
      __typename: 'CarouselModule',
      images: [{}, {}, {}],
      width: 100,
      autoPlay: true,
      hoverPause: true,
      showIndicator: true,
      showController: true,
      alt: 'carouselModule',
    } as CarouselModuleMock),
]);
