// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const totalSheetFragment = gql`
  fragment totalSheetFragment on Order {
    id
    priceInfo {
      productPrice
      shipmentFee
      paymentFee
      adjust
      total
    }
    activityInfo {
      activityId: id
      plugin
      discountPrice
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
