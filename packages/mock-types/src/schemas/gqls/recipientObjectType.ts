// import
import gql from 'graphql-tag';

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
