// import
import { gql } from '@apollo/client';

// definition
export const userRewardPointMockFragment = gql`
  fragment userRewardPointMockFragment on UserRewardPoint {
    currentBalance
  }
`;
