// import
import mock from '../mock';

// graphql typescript
import { ProductCarouselModuleType } from '../../../../__generated__/meepshop';
import { productCarouselModuleMockFragment } from './gqls/__generated__/productCarouselModuleMockFragment';

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
