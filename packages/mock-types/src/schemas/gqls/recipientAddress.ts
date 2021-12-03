// import
import { gql } from '@apollo/client';

// definition
export const recipientAddressMockFragment = gql`
  fragment recipientAddressMockFragment on RecipientAddress {
    name
    mobile
    country {
      id
    }
    city {
      id
    }
    area {
      id
    }
    street
    zipCode
  }
`;
