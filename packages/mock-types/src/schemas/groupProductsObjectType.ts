// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { groupProductsObjectTypeMock } from './__generated__/groupProductsObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment groupProductsObjectTypeMock on groupProductsObjectType {
    products {
      id
    }
  }
`;

export default mock.add<groupProductsObjectTypeMock>(
  'groupProductsObjectType',
  [
    () => ({
      __typename: 'groupProductsObjectType',
      products: null,
    }),
    () => ({
      __typename: 'groupProductsObjectType',
      products: [
        {
          __typename: 'productsObjectType',
          id: 'product-id',
        },
      ],
    }),
  ],
);
