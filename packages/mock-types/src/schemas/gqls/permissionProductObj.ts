// import
import gql from 'graphql-tag';

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
