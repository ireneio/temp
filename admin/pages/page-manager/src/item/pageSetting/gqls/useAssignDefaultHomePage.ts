// import
import { gql } from '@apollo/client';

// definition
export const assignDefaultHomePage = gql`
  mutation assignDefaultHomePage($input: AssignDefaultHomePageInput!) {
    assignDefaultHomePage(input: $input) {
      status
    }
  }
`;

export const useAssignDefaultHomePageReadCache = gql`
  query useAssignDefaultHomePageReadCache {
    viewer {
      id
      store {
        id
        defaultHomePage {
          id
        }
      }
    }
  }
`;

export const useAssignDefaultHomePageFragment = gql`
  fragment useAssignDefaultHomePageFragment on Store {
    id
    defaultHomePage {
      id
    }
  }
`;

export const useAssignDefaultHomePageUpdateNewPageFragment = gql`
  fragment useAssignDefaultHomePageUpdateNewPageFragment on Page {
    id
    isDefaultHomePage @client
  }
`;

export const useAssignDefaultHomePageUpdatePrevPageFragment = gql`
  fragment useAssignDefaultHomePageUpdatePrevPageFragment on Page {
    id
    isDefaultHomePage @client
  }
`;
