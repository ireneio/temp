// import
import { gql } from '@apollo/client';

// definition
export const recipientObjectTypeMockFragment = gql`
  fragment recipientObjectTypeMockFragment on RecipientObjectType {
    name
    email
    mobile
    address {
      streetAddress
    }
    receiverStoreName
    receiverStoreID
    receiverStoreAddress
    comment
  }
`;
