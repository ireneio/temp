// import
import { gql } from '@apollo/client';

// definition
export const exportBatchUpdateProductsFileService = gql`
  query exportBatchUpdateProductsFileService($queryId: ID!) {
    exportFileService(queryId: $queryId) {
      status
      uri
    }
  }
`;
