// import
import { gql } from '@apollo/client';

// definition
export const exportFileService = gql`
  query exportFileService($queryId: ID!) {
    exportFileService(queryId: $queryId) {
      status
      uri
    }
  }
`;
