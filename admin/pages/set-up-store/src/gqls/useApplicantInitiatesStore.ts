// import
import { gql } from '@apollo/client';

// definition
export const authorizeStore = gql`
  mutation authorizeStore($input: AuthorizeStoreInput!) {
    authorizeStore(input: $input) @client {
      status
    }
  }
`;

export const applicantInitiatesStore = gql`
  mutation applicantInitiatesStore($input: ApplicantInitiatesStoreInput!) {
    applicantInitiatesStore(input: $input) {
      status
      authorizationToken
    }
  }
`;
