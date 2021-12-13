// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useActivityInfoListFragment = gql`
  fragment useActivityInfoListFragment on Order {
    id
    activityInfo {
      id
      plugin
      discountPrice
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
