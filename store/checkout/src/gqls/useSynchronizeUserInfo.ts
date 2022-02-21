// import
import { gql } from '@apollo/client';

// definition
export const useSynchronizeUserInfoFragment = gql`
  fragment useSynchronizeUserInfoFragment on User {
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
