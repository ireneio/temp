// import
import { gql } from '@apollo/client';

// definition
export const useInitialValuesUserFragment = gql`
  fragment useInitialValuesUserFragment on User {
    id
    name
    mobile
    tel
    additionalInfo {
      mobile
      tel
    }
  }
`;
