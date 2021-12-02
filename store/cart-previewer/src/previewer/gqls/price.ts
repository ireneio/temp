// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const priceInPreviewerFragment = gql`
  fragment priceInPreviewerFragment on Order {
    id
    activityInfo {
      activityId: id
      title {
        ...localeFragment
      }
      discountPrice
    }

    priceInfo {
      productPrice
    }
  }

  ${localeFragment}
`;
