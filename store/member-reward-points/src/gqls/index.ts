// import
import gql from 'graphql-tag';

// graphql import
import { useColumnsUserPointsFragment } from './useColumns';

// definition
export const getUserRewardPotins = gql`
  query getUserRewardPotins {
    viewer {
      id
      rewardPoint {
        currentBalance
      }
    }

    getValidUserPointList(hasUseablePoints: true) {
      data {
        id
        ...useColumnsUserPointsFragment
      }
    }
  }

  ${useColumnsUserPointsFragment}
`;
