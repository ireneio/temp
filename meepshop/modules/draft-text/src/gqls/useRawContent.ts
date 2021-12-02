// import
import { gql } from '@apollo/client';

// definition
export const getDraftText = gql`
  query getDraftText($input: String) {
    getDraftText(input: $input) @client
  }
`;
