// import
import gql from 'graphql-tag';

// definition
// NO_FILTER
export const useVariantProductFragment = gql`
  fragment useVariantProductFragment on Product {
    id
    variants {
      id
      minPurchaseItems
      maxPurchaseLimit
      stock
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
