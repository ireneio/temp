// import
import gql from 'graphql-tag';

// definition
export const permissionStoreObjMockFragment = gql`
  fragment permissionStoreObjMockFragment on permissionStoreObj {
    index
    payment
    shipment
    exportSetting
  }
`;
