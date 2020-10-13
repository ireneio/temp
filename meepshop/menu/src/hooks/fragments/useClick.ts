// import
import gql from 'graphql-tag';

// definition
export const useClickUserFragment = gql`
  fragment useClickUserFragment on User {
    id
    role
  }
`;

export const useClickMenuPageObjectTypeFragment = gql`
  fragment useClickMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
  }
`;
