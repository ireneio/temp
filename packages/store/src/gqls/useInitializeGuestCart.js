// import
import { gql } from '@apollo/client';

// graphql import
import { useMergeCartFragment } from '@meepshop/hooks/lib/gqls/useMergeCart';

// definition
export const useInitializeGuestCartFragment = gql`
  fragment useInitializeGuestCartFragment on User {
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
