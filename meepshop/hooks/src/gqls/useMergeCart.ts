// import
import { gql } from '@apollo/client';

// definition
export const useMergeCartFragment = gql`
  fragment useMergeCartFragment on CartItem {
    __typename
    productId
    quantity
    variantId
  }
`;
