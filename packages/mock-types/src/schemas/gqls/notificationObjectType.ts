// import
import gql from 'graphql-tag';

// definition
export const notificationObjectTypeMockFragment = gql`
  fragment notificationObjectTypeMockFragment on NotificationObjectType {
    newsletters {
      cancelEmail
    }
  }
`;
