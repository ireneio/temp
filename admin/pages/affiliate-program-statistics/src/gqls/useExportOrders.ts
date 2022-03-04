// import
import { gql } from '@apollo/client';

// definition
export const exportOrders = gql`
  mutation exportOrders($input: RequestExportJobInput!) {
    requestExportJob(input: $input) {
      status
    }
  }
`;
