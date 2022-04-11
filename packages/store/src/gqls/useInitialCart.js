// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';
import { useMergeCartFragment } from '@meepshop/hooks/lib/gqls/useMergeCart';

// definition
export const useInitialCartFragment = gql`
  fragment useInitialCartFragment on User {
    id
    guestCart @client {
      ... on GuestCart {
        cartItems {
          ...useMergeCartFragment
        }
      }
    }
  }

  ${useMergeCartFragment}
`;

export const getCart = gql`
  query getCart {
    viewer {
      id
      role
      ...useCartFragment
      ...useInitialCartFragment
    }
  }

  ${useCartFragment}
  ${useInitialCartFragment}
`;
