// import
import gql from 'graphql-tag';

// definition
export const isMerchantEmailUsable = gql`
  query isMerchantEmailUsable($email: String!) {
    isMerchantEmailUsable(email: $email) {
      result
    }
  }
`;
