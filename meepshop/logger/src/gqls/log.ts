// import
import gql from 'graphql-tag';

// definition
export const log = gql`
  mutation log($input: LogInput!) {
    log(input: $input) @client
  }
`;
