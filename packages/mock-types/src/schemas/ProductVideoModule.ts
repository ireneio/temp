// import
import mock from '../mock';

// graphql typescript
import { VideoRatio } from '../../../../__generated__/meepshop';
import { productVideoModuleMockFragment } from './gqls/__generated__/productVideoModuleMockFragment';

// definition
export default mock.add<productVideoModuleMockFragment>('ProductVideoModule', [
  () => ({
    __typename: 'ProductVideoModule',
    width: '100',
    ratio: 'Ratio16to9' as VideoRatio,
    product: null,
  }),
  () => ({
    __typename: 'ProductVideoModule',
    width: '100',
    ratio: 'Ratio16to9' as VideoRatio,
    product: {},
  }),
]);
