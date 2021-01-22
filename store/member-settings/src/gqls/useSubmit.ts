// import
import gql from 'graphql-tag';

// definition
export const updateUser = gql`
  mutation updateUser($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export const useSubmitUpdateCache = gql`
  fragment useSubmitUpdateCache on User {
    id
    name
    gender
    birthday {
      year
      month
      day
    }
    additionalInfo {
      tel
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
    notification {
      newsletters {
        cancelEmail
      }
    }
  }
`;
