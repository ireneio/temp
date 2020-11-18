// import
import gql from 'graphql-tag';

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
    }
  }
`;
