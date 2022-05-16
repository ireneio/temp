// import
import { gql } from '@apollo/client';

// definition
export const batchUpdateOrderTag = gql`
  mutation batchUpdateOrderTag($input: BatchUpdateOrderTagInput!) {
    batchUpdateOrderTag(input: $input) {
      status
    }
  }
`;
