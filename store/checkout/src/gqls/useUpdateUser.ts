// import
import gql from 'graphql-tag';

// definition
export const updateUserAfterCreatingOrder = gql`
  mutation updateUserAfterCreatingOrder($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export const getUserCache = gql`
  query getUserCache {
    viewer {
      id
    }
  }
`;

export const useUpdateUserFragment = gql`
  fragment useUpdateUserFragment on User {
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
  }
`;
