// import
import mock from '../mock';

// graphql typescript
import { productQaModuleMockFragment } from './gqls/__generated__/productQaModuleMockFragment';

// definition
export default mock.add<productQaModuleMockFragment>('ProductQaModule', [
  () =>
    ({
      __typename: 'ProductQaModule',
      width: '100',
      product: null,
    } as productQaModuleMockFragment),
  () =>
    ({
      __typename: 'ProductQaModule',
      width: '100',
      product: {},
    } as productQaModuleMockFragment),
]);
