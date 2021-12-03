// import
import { gql } from '@apollo/client';

// definition
export const notificationObjectTypeMockFragment = gql`
  fragment notificationObjectTypeMockFragment on NotificationObjectType {
    newsletters {
      cancelEmail
    }
  }
`;
