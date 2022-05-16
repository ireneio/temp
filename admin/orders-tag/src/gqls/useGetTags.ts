// import
import { gql } from '@apollo/client';

// definition
export const getTags = gql`
  query getTags(
    $orderIds: [ID]!
    $input: AvailableOrderTagsToAddToOrdersInput!
  ) {
    mutualOrderTagsForOrders(orderIds: $orderIds) {
      id
      name
    }

    availableOrderTagsToAddToOrders(input: $input) {
      id
      name
    }
  }
`;
