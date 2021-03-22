// import
import gql from 'graphql-tag';

// definition
export const shipmentInfoFragment = gql`
  fragment shipmentInfoFragment on shipmentObjectType {
    id
    number
    recipient {
      receiverStoreName
      receiverStoreID
      receiverStoreAddress
    }
    description
  }
`;
