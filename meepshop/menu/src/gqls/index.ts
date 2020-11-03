// import
import gql from 'graphql-tag';

// graphql import
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './menuItem';
import { usePagesWithSearchBarFragment } from './usePagesWithSearchBar';

// definition
export const menuFragment = gql`
  fragment menuFragment on MenuModule {
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
    viewer {
      id
      ...menuItemUserFragment
    }
    cart {
      data {
        id
        ...menuItemOrderFragment
      }
    }
  }

  ${menuItemMenuPageObjectTypeFragment}
  ${menuItemMenuDesignObjectTypeFragment}
  ${usePagesWithSearchBarFragment}
  ${menuItemUserFragment}
  ${menuItemOrderFragment}
`;
