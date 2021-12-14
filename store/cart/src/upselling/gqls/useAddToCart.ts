// import
import { gql } from '@apollo/client';

// definition
export const useAddToCartProductFragment = gql`
  fragment useAddToCartProductFragment on Product {
    id
    specs {
      id
    }
    variants {
      id
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
`;

export const useAddToCartLineItemFragment = gql`
  fragment useAddToCartLineItemFragment on LineItem {
    id
    variant {
      id
    }
    quantity
  }
`;
