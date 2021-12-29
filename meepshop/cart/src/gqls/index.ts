// import
import { gql } from '@apollo/client';

// definition
export const cartFragment = gql`
  fragment cartFragment on Order {
    id
    categories {
      products {
        cartId
        productId
        quantity
        variantId
      }
    }
  }
`;
