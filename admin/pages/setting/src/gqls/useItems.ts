// import
import { gql } from '@apollo/client';

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
