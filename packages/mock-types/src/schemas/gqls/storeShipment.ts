// import
import gql from 'graphql-tag';

// definition
export const storeShipmentMockFragment = gql`
  fragment storeShipmentMockFragment on StoreShipment {
    title {
      zh_TW
    }
  }
`;
