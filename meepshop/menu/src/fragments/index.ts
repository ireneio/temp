// import
import gql from 'graphql-tag';

// graphql typescript
import { menuUserFragment as menuUserFragmentType } from './__generated__/menuUserFragment';

// typescript definition
export interface ContextType {
  user: menuUserFragmentType | null;
}

// definition
export const menuUserFragment = gql`
  fragment menuUserFragment on User {
    id
    role
  }
`;

export default gql`
  fragment menuFragment on MenuModule {
    id
    menu {
      id
    }
  }
`;
