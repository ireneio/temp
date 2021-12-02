// import
import { gql } from '@apollo/client';

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
