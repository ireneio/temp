// import
import gql from 'graphql-tag';

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
