// import
import mock from '../mock';

// graphql typescript
import {
  VideoRatio,
  productVideoModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

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
