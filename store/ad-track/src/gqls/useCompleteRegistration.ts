// import
import { gql } from '@apollo/client';

// definition
export const useCompleteRegistrationFragment = gql`
  fragment useCompleteRegistrationFragment on AdTracks {
    googleAdwordsConfig
    googleAdwordsSignUp
  }
`;
