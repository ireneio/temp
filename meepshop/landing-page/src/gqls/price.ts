// import
import gql from 'graphql-tag';

// definition
export const priceFragment = gql`
  fragment priceFragment on Order {
    id
    priceInfo {
      shipmentFee
      paymentFee
      productPrice
      total
    }
    activityInfo {
      id
      discountPrice
      title {
        zh_TW
        en_US
      }
      plugin
    }
  }
`;
