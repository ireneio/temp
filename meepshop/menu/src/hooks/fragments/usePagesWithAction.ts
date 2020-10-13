// import
import gql from 'graphql-tag';

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
