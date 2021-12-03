// import
import { gql } from '@apollo/client';

// definition
export const permissionStoreObjMockFragment = gql`
  fragment permissionStoreObjMockFragment on permissionStoreObj {
    index
    payment
    shipment
    exportSetting
  }
`;
