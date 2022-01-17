// import
import { gql } from '@apollo/client';

// graphql import
import { useComputedCartFragment } from './useComputedCart';
import { productsUserFragment } from './products';

// definition
export const getCart = gql`
  query getCart {
    viewer {
      id
      ...useComputedCartFragment
      ...productsUserFragment
    }
  }

  ${useComputedCartFragment}
  ${productsUserFragment}
`;
