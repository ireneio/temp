// import
import gql from 'graphql-tag';

// definition
export const gmoUserInfoMockFragment = gql`
  fragment gmoUserInfoMockFragment on GMOUserInfo {
    exist
    cardNumberFront
    cardNumberLater
  }
`;
