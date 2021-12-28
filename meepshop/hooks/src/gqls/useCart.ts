// import
import { gql } from '@apollo/client';

// graphql import
import { useMergeCartUserFragment } from './useMergeCart';
import { useUpsertCartUserFragment } from './useUpsertCart';

// definition
export const useCartFragment = gql`
  fragment useCartFragment on User {
    id
    guestCart @client {
      productId
      quantity
      variantId
    }
    ...useMergeCartUserFragment
    ...useUpsertCartUserFragment
  }

  ${useMergeCartUserFragment}
  ${useUpsertCartUserFragment}
`;
