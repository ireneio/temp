// import
import mock from '../mock';

// graphql typescript
import { productVideoModuleMockFragment } from './gqls/__generated__/productVideoModuleMockFragment';

// definition
export default mock.add<productVideoModuleMockFragment>('ProductVideoModule', [
  () =>
    ({
      __typename: 'ProductVideoModule',
      width: '100',
      ratio: 'Ratio16to9',
      product: null,
    } as productVideoModuleMockFragment),
  () =>
    ({
      __typename: 'ProductVideoModule',
      width: '100',
      ratio: 'Ratio16to9',
      product: {},
    } as productVideoModuleMockFragment),
]);
