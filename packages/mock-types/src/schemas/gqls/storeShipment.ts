// import
import { gql } from '@apollo/client';

// definition
export const storeShipmentMockFragment = gql`
  fragment storeShipmentMockFragment on StoreShipment {
    title {
      zh_TW
    }
  }
`;
