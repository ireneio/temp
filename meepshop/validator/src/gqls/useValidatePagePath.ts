// import
import { gql } from '@apollo/client';

// definition
export const checkIfPageExistsBeforeCreatingPage = gql`
  query checkIfPageExistsBeforeCreatingPage($input: String!) {
    isPagePathExists(pagePath: $input)
  }
`;
