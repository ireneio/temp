// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductCollectionsModuleMock } from './__generated__/ProductCollectionsModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductCollectionsModuleMock on ProductCollectionsModule {
    productCollectionsType
    percentWidth
  }
`;

export default mock.add<ProductCollectionsModuleMock>(
  'ProductCollectionsModule',
  [
    () =>
      ({
        __typename: 'ProductCollectionsModule',
        productCollectionsType: 'ORIGIN',
        percentWidth: 'WIDTH100',
        product: null,
      } as ProductCollectionsModuleMock),
    () =>
      ({
        __typename: 'ProductCollectionsModule',
        productCollectionsType: 'SIDE',
        percentWidth: 'WIDTH50',
        product: {},
      } as ProductCollectionsModuleMock),
  ],
);
