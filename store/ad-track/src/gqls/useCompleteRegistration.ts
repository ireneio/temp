// import
import gql from 'graphql-tag';

// definition
export const useCompleteRegistrationFragment = gql`
  fragment useCompleteRegistrationFragment on AdTracks {
    googleAdwordsConfig
    googleAdwordsSignUp
  }
`;
