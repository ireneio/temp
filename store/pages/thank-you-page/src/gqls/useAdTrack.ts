// import
import gql from 'graphql-tag';

// definition
export const useAdTrackFragment = gql`
  fragment useAdTrackFragment on Order {
    id
    orderNo
    products {
      id
      productId
      type
      title {
        zh_TW
      }
      specs {
        title {
          zh_TW
        }
      }
      totalPrice
      quantity
    }

    priceInfo {
      total
      shipmentFee
      paymentFee
      currency
    }
  }
`;
