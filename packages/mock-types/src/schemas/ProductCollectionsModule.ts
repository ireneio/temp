// import
import mock from '../mock';

// graphql typescript
import { productCollectionsModuleMockFragment } from './gqls/__generated__/productCollectionsModuleMockFragment';

// definition
export default mock.add<productCollectionsModuleMockFragment>(
  'ProductCollectionsModule',
  [
    () =>
      ({
        __typename: 'ProductCollectionsModule',
        productCollectionsType: 'ORIGIN',
        percentWidth: 'WIDTH100',
        product: null,
      } as productCollectionsModuleMockFragment),
    () =>
      ({
        __typename: 'ProductCollectionsModule',
        productCollectionsType: 'SIDE',
        percentWidth: 'WIDTH50',
        product: {},
      } as productCollectionsModuleMockFragment),
  ],
);
