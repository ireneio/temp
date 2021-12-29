// import
import { gql } from '@apollo/client';

// definition
// NO_FILTER
export const useVariantProductFragment = gql`
  fragment useVariantProductFragment on Product {
    id
    variants {
      id
      stock
      currentMinPurchasableQty
      currentMaxPurchasableQty
    }
  }
`;

export const useVariantOrderListFragment = gql`
  fragment useVariantOrderListFragment on OrderList {
    data {
      id
      categories {
        id
        products {
          id
          variantId
          quantity
        }
      }
    }
  }
`;

export const useVariantLineItemFragment = gql`
  fragment useVariantLineItemFragment on LineItem {
    id
    productId
    quantity
    variantId
    cartId(cartProducts: $cartProducts) @client
  }
`;
