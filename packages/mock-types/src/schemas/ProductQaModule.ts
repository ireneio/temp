// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductQaModuleMock } from './__generated__/ProductQaModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductQaModuleMock on ProductQaModule {
    width
  }
`;

export default mock.add<ProductQaModuleMock>('ProductQaModule', [
  () =>
    ({
      __typename: 'ProductQaModule',
      width: '100',
      product: null,
    } as ProductQaModuleMock),
  () =>
    ({
      __typename: 'ProductQaModule',
      width: '100',
      product: {},
    } as ProductQaModuleMock),
]);
