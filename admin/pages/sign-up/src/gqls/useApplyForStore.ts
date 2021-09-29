// import
import gql from 'graphql-tag';

// definition
export const applyForStore = gql`
  mutation applyForStore($input: ApplyForStoreInput!) {
    applyForStore(input: $input) {
      status
    }
  }
`;
