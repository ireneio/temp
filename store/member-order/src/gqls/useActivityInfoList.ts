// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useActivityInfoListFragment = gql`
  fragment useActivityInfoListFragment on Order {
    id
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
