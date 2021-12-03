// import
import { gql } from '@apollo/client';

// definition
export const permissionUserObjMockFragment = gql`
  fragment permissionUserObjMockFragment on permissionUserObj {
    index
    create
    update
    remove
    export
  }
`;
