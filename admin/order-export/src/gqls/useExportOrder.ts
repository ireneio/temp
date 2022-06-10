// import
import { gql } from '@apollo/client';

// definition
export const exportOrder = gql`
  mutation exportOrder($input: RequestExportFileInput!) {
    requestExportFile(input: $input)
  }
`;

export const exportOderFileService = gql`
  query exportOderFileService($queryId: ID!) {
    exportFileService(queryId: $queryId) {
      status
      uri
    }
  }
`;
