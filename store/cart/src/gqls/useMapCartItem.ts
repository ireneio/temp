// import
import { gql } from '@apollo/client';

// definition
export const cartOrderFragment = gql`
  fragment cartOrderFragment on Order {
    id
    categories {
      id
      products {
        id
        cartId
        productId
        quantity
        variantId
      }
    }
  }
`;

export const getCartList = gql`
  query getCartList {
    getCartList {
      data {
        id
        ...cartOrderFragment
      }
    }
  }

  ${cartOrderFragment}
`;
