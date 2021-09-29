// import
import gql from 'graphql-tag';

// definition
export const applicantInitiatesStore = gql`
  mutation applicantInitiatesStore($input: ApplicantInitiatesStoreInput!) {
    applicantInitiatesStore(input: $input) {
      status
      token
    }
  }
`;
