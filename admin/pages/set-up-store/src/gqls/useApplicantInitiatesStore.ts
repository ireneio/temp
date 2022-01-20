// import
import { gql } from '@apollo/client';

// definition
export const applicantInitiatesStore = gql`
  mutation applicantInitiatesStore($input: ApplicantInitiatesStoreInput!) {
    applicantInitiatesStore(input: $input) {
      status
      authorizationToken
    }
  }
`;
