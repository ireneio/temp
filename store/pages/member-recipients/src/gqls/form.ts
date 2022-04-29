// import
import { gql } from '@apollo/client';

// graphql import
import { useSaveFragment } from './useSave';

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

export const formUserFragment = gql`
  fragment formUserFragment on User {
    id
    store {
      id
      shippableCountries {
        id
      }
    }
    shippableRecipientAddresses {
      id
      ...formRecipientAddressFragment
    }
    ...useSaveFragment
  }

  ${formRecipientAddressFragment}
  ${useSaveFragment}
`;
