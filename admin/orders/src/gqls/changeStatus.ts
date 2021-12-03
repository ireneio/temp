// import
import { gql } from '@apollo/client';

// definition
export const updateOrder = gql`
  mutation updateOrder($updateOrder: UpdateOrder) {
    updateOrder(updateOrder: $updateOrder) {
      id
      status
      shipmentInfo {
        status
      }
      paymentInfo {
        status
      }
    }
  }
`;

export const changeStatusOrderFragment = gql`
  fragment changeStatusOrderFragment on Order {
    id
    status
    shipmentInfo {
      status
    }
    paymentInfo {
      status
    }
  }
`;
