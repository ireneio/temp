// import
import gql from 'graphql-tag';

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
