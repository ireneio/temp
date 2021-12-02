// import
import { gql } from '@apollo/client';

// definition
export const unsubscribeFromNotification = gql`
  mutation unsubscribeFromNotification(
    $input: UnsubscribeFromNotificationInput!
  ) {
    unsubscribeFromNotification(input: $input) {
      success
    }
  }
`;
