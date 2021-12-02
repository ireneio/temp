// import
import { gql } from '@apollo/client';

// definition
export const actionsFragment = gql`
  fragment actionsFragment on Order {
    id
    status
    isAvailableForPayLater @client
    isAvailableForOrderApply @client
    isOrderApplied @client
    choosePayLaterWhenPlaced
    paymentInfo {
      status
      list {
        id
        template
        paymentId
      }
    }
    shipmentInfo {
      status
    }
  }
`;
