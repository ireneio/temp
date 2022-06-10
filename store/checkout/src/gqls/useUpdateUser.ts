// import
import { gql } from '@apollo/client';

// definition
export const updateUserAfterCreatingOrder = gql`
  mutation updateUserAfterCreatingOrder($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export const useUpdateUserFragment = gql`
  fragment useUpdateUserFragment on User {
    id
    name
    mobile
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
  }
`;
