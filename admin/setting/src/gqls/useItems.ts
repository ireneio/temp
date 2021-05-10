// import
import gql from 'graphql-tag';

// definition
export const useItemsFragment = gql`
  fragment useItemsFragment on permissionStoreObj {
    index
    payment
    shipment
    exportSetting
    ableToEditNotificationSetting
  }
`;
