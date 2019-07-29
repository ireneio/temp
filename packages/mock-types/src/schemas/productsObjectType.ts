// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { productsObjectTypeMock } from './__generated__/productsObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment productsObjectTypeMock on productsObjectType {
    id
  }
`;

export default mock.add<productsObjectTypeMock>('productsObjectType', [
  () => ({
    __typename: 'productsObjectType',
    id: 'product-id',
    quantity: 10,
    type: 'gift',
  }),
  () => ({
    __typename: 'productsObjectType',
    id: 'product-id',
    quantity: 10,
    type: 'product',
  }),
]);
