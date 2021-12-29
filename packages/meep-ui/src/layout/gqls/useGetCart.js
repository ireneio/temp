// import
import { gql } from '@apollo/client';

// definition
export const getCartList = gql`
  query getCartList {
    getCartList {
      data {
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
    }
  }
`;
