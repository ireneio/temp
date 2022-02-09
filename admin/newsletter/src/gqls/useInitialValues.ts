// import
import { gql } from '@apollo/client';

// definition
export const useInitialValuesNewsLetterFragment = gql`
  fragment useInitialValuesNewsLetterFragment on NewsLetter {
    id
    status
    subject
    template
    toUsers {
      filter {
        and {
          field
          query
          type
        }
      }
    }
  }
`;
