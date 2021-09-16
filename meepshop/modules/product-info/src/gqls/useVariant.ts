// import
import gql from 'graphql-tag';

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
