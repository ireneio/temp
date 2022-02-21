// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useActivitiesFragment = gql`
  fragment useActivitiesFragment on Order {
    id
    activityInfo {
      id
      title {
        ...localeFragment
      }
      discountPrice
      plugin
    }
  }

  ${localeFragment}
`;
