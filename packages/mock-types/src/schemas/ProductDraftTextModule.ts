// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductDraftTextModuleMock } from './__generated__/ProductDraftTextModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductDraftTextModuleMock on ProductDraftTextModule {
    __typename
  }
`;

export default mock.add<ProductDraftTextModuleMock>('ProductDraftTextModule', [
  () =>
    ({
      __typename: 'ProductDraftTextModule',
      product: null,
    } as ProductDraftTextModuleMock),
  () =>
    ({
      __typename: 'ProductDraftTextModule',
      product: {},
    } as ProductDraftTextModuleMock),
]);
