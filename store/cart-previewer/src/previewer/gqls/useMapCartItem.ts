// import
import { gql } from '@apollo/client';

// definition
export const previewerFragment = gql`
  fragment previewerFragment on Order {
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

export const getCartListInPreviewer = gql`
  query getCartListInPreviewer {
    getCartList {
      data {
        id
        ...previewerFragment
      }
    }
  }

  ${previewerFragment}
`;
