// import
import mock from '../mock';

// graphql typescript
import {
  ProductCollectionsModuleType,
  PercentWidth,
} from '../../../../__generated__/meepshop';
import { productCollectionsModuleMockFragment } from './gqls/__generated__/productCollectionsModuleMockFragment';

// definition
export default mock.add<productCollectionsModuleMockFragment>(
  'ProductCollectionsModule',
  [
    () => ({
      __typename: 'ProductCollectionsModule',
      productCollectionsType: 'ORIGIN' as ProductCollectionsModuleType,
      percentWidth: 'WIDTH100' as PercentWidth,
      product: null,
    }),
    () => ({
      __typename: 'ProductCollectionsModule',
      productCollectionsType: 'SIDE' as ProductCollectionsModuleType,
      percentWidth: 'WIDTH50' as PercentWidth,
      product: {},
    }),
  ],
);
