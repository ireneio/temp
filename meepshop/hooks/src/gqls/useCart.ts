// import
import { gql } from '@apollo/client';

// graphql import
import { useMergeCartFragment } from './useMergeCart';
import { useUpsertCartUserFragment } from './useUpsertCart';

// definition
export const useCartFragment = gql`
  fragment useCartFragment on User {
    id
    role
    cart {
      ... on Cart {
        cartItems {
          ...useMergeCartFragment
        }
      }
    }
    guestCart @client {
      ... on GuestCart {
        cartItems {
          ...useMergeCartFragment
        }
      }
    }
    ...useUpsertCartUserFragment
  }

  ${useMergeCartFragment}
  ${useUpsertCartUserFragment}
`;
