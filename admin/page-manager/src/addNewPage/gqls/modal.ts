// import
import gql from 'graphql-tag';

// definition
export const checkIfPageExistsBeforeCreatingPage = gql`
  query checkIfPageExistsBeforeCreatingPage($input: String!) {
    isPagePathExists(pagePath: $input)
  }
`;
