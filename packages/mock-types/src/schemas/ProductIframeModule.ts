// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductIframeModuleMock } from './__generated__/ProductIframeModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductIframeModuleMock on ProductIframeModule {
    __typename
  }
`;

export default mock.add<ProductIframeModuleMock>('ProductIframeModule', [
  () =>
    ({
      __typename: 'ProductIframeModule',
      product: null,
    } as ProductIframeModuleMock),
  () =>
    ({
      __typename: 'ProductIframeModule',
      product: {},
    } as ProductIframeModuleMock),
]);
