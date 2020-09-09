// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductCarouselModuleMock } from './__generated__/ProductCarouselModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductCarouselModuleMock on ProductCarouselModule {
    productCarouselType
    autoPlay
  }
`;

export default mock.add<ProductCarouselModuleMock>('ProductCarouselModule', [
  () =>
    ({
      __typename: 'ProductCarouselModule',
      productCarouselType: 'BOTTOM',
      autoPlay: true,
      product: null,
    } as ProductCarouselModuleMock),
  () =>
    ({
      __typename: 'ProductCarouselModule',
      productCarouselType: 'NONE',
      autoPlay: false,
      product: {},
    } as ProductCarouselModuleMock),
]);
