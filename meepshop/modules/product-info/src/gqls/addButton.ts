// import
import gql from 'graphql-tag';

// definition
export const addButtonUserFragment = gql`
  fragment addButtonUserFragment on User {
    id
    role
  }
`;

export const addButtonVariantFragment = gql`
  fragment addButtonVariantFragment on Variant {
    id
    currentMinPurchasableQty
    currentMaxPurchasableQty
  }
`;

export const addButtonStockNotificationFragment = gql`
  fragment addButtonStockNotificationFragment on StockNotification {
    id
    variantId
  }
`;
