// import
import { gql } from '@apollo/client';

// graphql import
import { useUpdateUserFragment } from './useUpdateUser';
import { useCreateOrderFragment } from './useCreateOrder';

// definition
export const getCheckoutInfo = gql`
  query getCheckoutInfo($first: PositiveInt!) {
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
      ...useCreateOrderFragment
    }
  }

  ${useUpdateUserFragment}
  ${useCreateOrderFragment}
`;
