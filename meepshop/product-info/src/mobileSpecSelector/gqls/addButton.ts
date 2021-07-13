// import
import gql from 'graphql-tag';

// definition
export const addButtonFragment = gql`
  fragment addButtonFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;
