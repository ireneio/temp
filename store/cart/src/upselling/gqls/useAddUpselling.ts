// import
import { gql } from '@apollo/client';

// definition
export const useAddUpsellingVariantFragment = gql`
  fragment useAddUpsellingVariantFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;

export const useAddUpsellingLineItemFragment = gql`
  fragment useAddUpsellingLineItemFragment on LineItem {
    id
    product {
      id
    }
    variant {
      id
    }
    quantity
  }
`;
