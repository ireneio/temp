// import
import { gql } from '@apollo/client';

import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useColumnsUserPointsFragment = gql`
  fragment useColumnsUserPointsFragment on UserPoints {
    id
    title {
      ...localeFragment
    }
    activity {
      ...localeFragment
    }
    note
    points
    startAt
    endAt
  }

  ${localeFragment}
`;
