// import
import { gql } from '@apollo/client';

// definition
export const updateNotificationSetting = gql`
  mutation updateNotificationSetting(
    $value: StoreEmailNotificationEventSubscriptionInput!
  ) {
    setStoreEmailNotificationEventSubscription(input: $value) {
      status
    }
  }
`;

export const useUpdateNotificationSettingFragment = gql`
  fragment useUpdateNotificationSettingFragment on Store {
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
`;
