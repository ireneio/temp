// import
import { gql } from '@apollo/client';

// definition
export const launchStore = gql`
  mutation launchStore($input: LaunchStoreInput!) {
    launchStore(input: $input) {
      result
    }
  }
`;
