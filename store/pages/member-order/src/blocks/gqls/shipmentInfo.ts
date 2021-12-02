// import
import { gql } from '@apollo/client';

// definition
export const shipmentInfoFragment = gql`
  fragment shipmentInfoFragment on shipmentObjectType {
    id
    template
    number
    recipient {
      receiverStoreName
      receiverStoreID
      receiverStoreAddress
    }
    description
  }
`;
