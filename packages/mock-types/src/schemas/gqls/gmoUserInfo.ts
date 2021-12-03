// import
import { gql } from '@apollo/client';

// definition
export const gmoUserInfoMockFragment = gql`
  fragment gmoUserInfoMockFragment on GMOUserInfo {
    exist
    cardNumberFront
    cardNumberLater
  }
`;
