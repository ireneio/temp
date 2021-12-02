// import
import { gql } from '@apollo/client';

// definition
export const log = gql`
  mutation log($input: LogInput!) {
    log(input: $input) @client
  }
`;
