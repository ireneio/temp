// import
import { gql } from '@apollo/client';

// definition
export const permissionProductObjMockFragment = gql`
  fragment permissionProductObjMockFragment on permissionProductObj {
    index
    create
    update
    remove
    cost
    export
  }
`;
