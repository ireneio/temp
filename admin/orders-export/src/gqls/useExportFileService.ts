// import
import gql from 'graphql-tag';

// definition
export const exportFileService = gql`
  query exportFileService($queryId: ID!) {
    exportFileService(queryId: $queryId) {
      status
      uri
    }
  }
`;
