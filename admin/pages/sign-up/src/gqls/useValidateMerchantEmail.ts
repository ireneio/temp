// import
import { gql } from '@apollo/client';

// definition
export const isMerchantEmailUsable = gql`
  query isMerchantEmailUsable($email: String!) {
    isMerchantEmailUsable(email: $email) {
      result
    }
  }
`;
