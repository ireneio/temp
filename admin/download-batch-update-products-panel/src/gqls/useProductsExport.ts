// import
import { gql } from '@apollo/client';

// definition
export const requestBatchUpdateProductsFile = gql`
  mutation requestBatchUpdateProductsFile($input: RequestExportFileInput!) {
    requestExportFile(input: $input)
  }
`;
