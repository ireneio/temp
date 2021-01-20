// import
import mock from '../mock';

// graphql typescript
import {
  ProductCarouselModuleType,
  productCarouselModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productCarouselModuleMockFragment>(
  'ProductCarouselModule',
  [
    () => ({
      __typename: 'ProductCarouselModule',
      productCarouselType: 'BOTTOM' as ProductCarouselModuleType,
      autoPlay: true,
      product: null,
    }),
    () => ({
      __typename: 'ProductCarouselModule',
      productCarouselType: 'NONE' as ProductCarouselModuleType,
      autoPlay: false,
      product: {},
    }),
  ],
);
