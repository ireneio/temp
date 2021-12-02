// import
import { gql } from '@apollo/client';

// definition
export const useOptionsVariantFragment = gql`
  fragment useOptionsVariantFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;
