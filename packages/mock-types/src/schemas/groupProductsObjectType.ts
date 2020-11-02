// import
import mock from '../mock';

// graphql typescript
import { groupProductsObjectTypeMockFragment } from './gqls/__generated__/groupProductsObjectTypeMockFragment';

// definition
export default mock.add<groupProductsObjectTypeMockFragment>(
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
