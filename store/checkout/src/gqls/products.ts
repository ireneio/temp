// import
import { gql } from '@apollo/client';

// graphql import
import { useProductColumnsFragment } from './useProductColumns';

// definition
export const productsFragment = gql`
  fragment productsFragment on Order {
    id
    categories {
      id
      products {
        ...useProductColumnsFragment
      }
    }
  }

  ${useProductColumnsFragment}
`;
