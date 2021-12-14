// import
import { gql } from '@apollo/client';

// definition
// NO_FILTER
export const useVariantFragment = gql`
  fragment useVariantFragment on Product {
    id
    variants {
      id
      stock
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
`;
