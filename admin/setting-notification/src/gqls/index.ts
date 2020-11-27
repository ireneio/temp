// import
import gql from 'graphql-tag';

// definition
export const getNotificationsSetting = gql`
  query getNotificationsSetting {
    viewer {
      id
      store {
        id
        setting {
          emailNotificationEventSubscription {
            recipientEmail
            orderCreated
            orderMessageReceived
            orderTransferMessageReceived
            orderReturnedOrExchanged
            productQAReceived
          }
        }
      }
    }
  }
`;
