// import
import gql from 'graphql-tag';

// graphql typescript
import { menuUserFragment as menuUserFragmentType } from './__generated__/menuUserFragment';
import { menuOrderFragment as menuOrderFragmentType } from './__generated__/menuOrderFragment';

// graphql import
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './menuItem';
import usePagesWithSearchBarFragment from './usePagesWithSearchBar';

// typescript definition
export interface ContextType {
  user: menuUserFragmentType | null;
  order: menuOrderFragmentType | null;
}

// definition
export const menuUserFragment = gql`
  fragment menuUserFragment on User {
    id
    ...menuItemUserFragment
  }

  ${menuItemUserFragment}
`;

export const menuOrderFragment = gql`
  fragment menuOrderFragment on Order {
    id
    ...menuItemOrderFragment
  }

  ${menuItemOrderFragment}
`;

export const menuMenuModuleFragment = gql`
  fragment menuMenuModuleFragment on MenuModule {
    id
    menu {
      id
      pages {
        id
        ...menuItemMenuPageObjectTypeFragment
        pages {
          id
          ...menuItemMenuPageObjectTypeFragment
          pages {
            id
            ...menuItemMenuPageObjectTypeFragment
          }
        }
      }
      design {
        ...menuItemMenuDesignObjectTypeFragment
        ...usePagesWithSearchBarFragment
      }
    }
  }

  ${menuItemMenuPageObjectTypeFragment}
  ${menuItemMenuDesignObjectTypeFragment}
  ${usePagesWithSearchBarFragment}
`;
