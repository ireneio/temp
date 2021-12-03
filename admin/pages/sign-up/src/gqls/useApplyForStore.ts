// import
import { gql } from '@apollo/client';

// definition
export const applyForStore = gql`
  mutation applyForStore($input: ApplyForStoreInput!) {
    applyForStore(input: $input) {
      status
    }
  }
`;
