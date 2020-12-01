// import
import gql from 'graphql-tag';

// definition
export const useSubmitFragment = gql`
  fragment useSubmitFragment on Order {
    id
    priceInfo {
      currency
      shipmentFee
      paymentFee
      productPrice
      total
    }
    categories {
      products {
        id
        sku
        type
        title {
          zh_TW
          en_US
        }
        specs {
          id
          title {
            zh_TW
            en_US
          }
        }
        productId
        variantId
        quantity
        totalPrice
      }
    }
  }
`;
