// import
import gql from 'graphql-tag';

// definition
export const getDraftText = gql`
  query getDraftText($input: String) {
    getDraftText(input: $input) @client
  }
`;
