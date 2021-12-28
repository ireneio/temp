// import
import { gql } from '@apollo/client';

// definition
const useMergeCartCartItemFragment = gql`
  fragment useMergeCartCartItemFragment on CartItem {
    productId
    quantity
    variantId
  }
`;

export const useMergeCartUserFragment = gql`
  fragment useMergeCartUserFragment on User {
    id
    cart @include(if: $isShopper) {
      ... on Cart {
        cartItems {
          ...useMergeCartCartItemFragment
        }
      }
    }
    guestCart @client {
      ...useMergeCartCartItemFragment
    }
  }

  ${useMergeCartCartItemFragment}
`;
