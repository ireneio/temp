// import
import gql from 'graphql-tag';

// graphql import
import { useSubmitOrderRemittanceAdviceFragment } from './useSubmitOrderRemittanceAdvice';

// definition
export const getOrderPaidMessage = gql`
  query getOrderPaidMessage($orderId: ID!) {
    viewer {
      id
      store {
        id
        setting {
          paidMessage
        }
      }
      order(orderId: $orderId) {
        id
        orderNo
        paidMessage {
          note
        }

        ...useSubmitOrderRemittanceAdviceFragment
      }
    }
  }

  ${useSubmitOrderRemittanceAdviceFragment}
`;
