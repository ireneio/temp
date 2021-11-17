// import
import gql from 'graphql-tag';

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
      token
    }
  }
`;
