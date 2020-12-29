// import
import gql from 'graphql-tag';

// definition
export const launchStore = gql`
  mutation launchStore($input: LaunchStoreInput!) {
    launchStore(input: $input) {
      result
    }
  }
`;
