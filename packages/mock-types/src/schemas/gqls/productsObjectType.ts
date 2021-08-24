// import
import gql from 'graphql-tag';

// definition
export const productsObjectTypeMockFragment = gql`
  fragment productsObjectTypeMockFragment on productsObjectType {
    productId
    sku
    title {
      zh_TW
    }
    specs {
      title {
        zh_TW
      }
    }
    retailPrice
    totalPrice
    quantity
    _error
    variant {
      currentMaxPurchasableQty
      currentMinPurchasableQty
    }
  }
`;
