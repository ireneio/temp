// import
import { gql } from '@apollo/client';

// definition
export const addButtonFragment = gql`
  fragment addButtonFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;
