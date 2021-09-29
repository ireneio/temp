// import
import gql from 'graphql-tag';

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
