// import
import gql from 'graphql-tag';

// definition
export const facebookFragment = gql`
  fragment facebookFragment on FacebookSetting {
    appId
    appSecret
  }
`;
