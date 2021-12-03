import gql from 'graphql-tag';

export const getExpiringPoints = gql`
  query getExpiringPoints($expireBy: Int!) {
    viewer {
      id
      role
      rewardPoint {
        expiringPoints(expireBy: $expireBy) {
          total
        }
      }
    }
  }
`;
