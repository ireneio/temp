// import
import { gql } from '@apollo/client';

// definition
export const permissionServiceObjMockFragment = gql`
  fragment permissionServiceObjMockFragment on permissionServiceObj {
    index
    product
  }
`;
