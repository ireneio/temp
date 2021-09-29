// import
import gql from 'graphql-tag';

// definition
export const useInitialValuesUserFragment = gql`
  fragment useInitialValuesUserFragment on User {
    id
    name
    additionalInfo {
      mobile
      tel
    }
  }
`;
