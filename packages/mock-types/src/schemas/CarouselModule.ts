// import
import mock from '../mock';

// graphql typescript
import { carouselModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<carouselModuleMockFragment>('CarouselModule', [
  () => ({
    __typename: 'CarouselModule',
    images: null,
    width: 100,
    autoPlay: true,
    hoverPause: true,
    showIndicator: true,
    showController: true,
    alt: 'carouselModule',
  }),
  () => ({
    __typename: 'CarouselModule',
    images: [{}, {}, {}],
    width: 100,
    autoPlay: true,
    hoverPause: true,
    showIndicator: true,
    showController: true,
    alt: 'carouselModule',
  }),
]);
