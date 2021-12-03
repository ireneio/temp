// import
import { gql } from '@apollo/client';

// definition
export const submitOrderToEcpayLogisticsService = gql`
  mutation submitOrderToEcpayLogisticsService(
    $input: SubmitOrderToEcpayLogisticsServiceInput!
  ) {
    submitOrderToEcpayLogisticsService(input: $input) {
      ... on OkResponse {
        message
      }

      ... on UnauthorizedError {
        message
      }

      ... on UnhandledSubmitOrderToEcpayLogisticsServiceError {
        message
      }
    }
  }
`;

export const useSubmitEcpayOrderOrderFragment = gql`
  fragment useSubmitEcpayOrderOrderFragment on Order {
    id
    latestLogisticTracking {
      status
    }
  }
`;
