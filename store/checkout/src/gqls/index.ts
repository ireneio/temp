// import
import { gql } from '@apollo/client';

// graphql import
import { useUpdateUserFragment } from './useUpdateUser';

// definition
export const getCheckoutInfo = gql`
  query getCheckoutInfo {
    viewer {
      id
      name
      additionalInfo {
        mobile
      }
      address {
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
      shippableRecipientAddresses {
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
        street
        zipCode
      }
      store {
        id
        setting {
          checkoutFields {
            name
            mobile
            address
          }
        }
      }
      ...useUpdateUserFragment
    }
  }

  ${useUpdateUserFragment}
`;
