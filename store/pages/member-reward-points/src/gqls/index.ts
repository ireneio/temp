// import
import { gql } from '@apollo/client';

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
