// import
import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

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
        ...localeFragment
      }
      specs {
        title {
          ...localeFragment
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

  ${localeFragment}
`;
