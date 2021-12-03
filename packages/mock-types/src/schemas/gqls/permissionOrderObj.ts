// import
import { gql } from '@apollo/client';

// definition
export const permissionOrderObjMockFragment = gql`
  fragment permissionOrderObjMockFragment on permissionOrderObj {
    index
    paymentStatus
    shipmentStatus
    status
    create
    export
  }
`;
