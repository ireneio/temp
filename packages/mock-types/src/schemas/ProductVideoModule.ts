// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ProductVideoModuleMock } from './__generated__/ProductVideoModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ProductVideoModuleMock on ProductVideoModule {
    width
    ratio
  }
`;

export default mock.add<ProductVideoModuleMock>('ProductVideoModule', [
  () =>
    ({
      __typename: 'ProductVideoModule',
      width: '100',
      ratio: 'Ratio16to9',
      product: null,
    } as ProductVideoModuleMock),
  () =>
    ({
      __typename: 'ProductVideoModule',
      width: '100',
      ratio: 'Ratio16to9',
      product: {},
    } as ProductVideoModuleMock),
]);
