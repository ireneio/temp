// import
import { gql } from '@apollo/client';

// definition
export const formRecipientAddressFragment = gql`
  fragment formRecipientAddressFragment on RecipientAddress {
    id
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
    zipCode
    street
  }
`;

export const formStoreFragment = gql`
  fragment formStoreFragment on Store {
    id
    shippableCountries {
      id
    }
  }
`;
