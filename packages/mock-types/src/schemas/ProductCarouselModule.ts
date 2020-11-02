// import
import mock from '../mock';

// graphql typescript
import { productCarouselModuleMockFragment } from './gqls/__generated__/productCarouselModuleMockFragment';

// definition
export default mock.add<productCarouselModuleMockFragment>(
  'ProductCarouselModule',
  [
    () =>
      ({
        __typename: 'ProductCarouselModule',
        productCarouselType: 'BOTTOM',
        autoPlay: true,
        product: null,
      } as productCarouselModuleMockFragment),
    () =>
      ({
        __typename: 'ProductCarouselModule',
        productCarouselType: 'NONE',
        autoPlay: false,
        product: {},
      } as productCarouselModuleMockFragment),
  ],
);
