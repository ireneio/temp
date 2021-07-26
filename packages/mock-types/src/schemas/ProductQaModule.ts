// import
import mock from '../mock';

// graphql typescript
import { productQaModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<productQaModuleMockFragment>('ProductQaModule', [
  () => ({
    __typename: 'ProductQaModule',
    width: 100,
    product: null,
  }),
  () => ({
    __typename: 'ProductQaModule',
    width: 100,
    product: {},
  }),
]);
