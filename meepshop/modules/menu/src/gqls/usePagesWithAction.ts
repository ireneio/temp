// import
import { gql } from '@apollo/client';

// definition
export const usePagesWithActionUserFragment = gql`
  fragment usePagesWithActionUserFragment on User {
    id
    role
    store {
      id
      setting {
        locale
        currency
      }
    }
  }
`;

export const usePagesWithActionMenuPageObjectTypeFragment = gql`
  fragment usePagesWithActionMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
  }
`;
