// import
import { gql } from '@apollo/client';

// definition
export const facebookFragment = gql`
  fragment facebookFragment on FacebookSetting {
    appId
    appSecret
  }
`;
