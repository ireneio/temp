// import
import { gql } from '@apollo/client';

// definition
export const submitOrderRemittanceAdvice = gql`
  mutation submitOrderRemittanceAdvice(
    $input: SubmitOrderRemittanceAdviceInput!
  ) {
    submitOrderRemittanceAdvice(input: $input) {
      ... on OkResponse {
        message
      }
    }
  }
`;

export const useSubmitOrderRemittanceAdviceFragment = gql`
  fragment useSubmitOrderRemittanceAdviceFragment on Order {
    id
    paymentInfo {
      id
      status
    }
    paidMessage {
      __typename
      note
    }
  }
`;
