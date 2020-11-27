// import
import gql from 'graphql-tag';

// graphql import
import { logoUserFragment, logoMenuDesignObjectTypeFragment } from './logo';
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './menuItem';
import { usePagesWithSearchBarFragment } from './usePagesWithSearchBar';

// definition
export const menuUserFragment = gql`
  fragment menuUserFragment on User {
    id
    ...menuItemUserFragment
  }

  ${menuItemUserFragment}
`;

export const menuOrderListFragment = gql`
  fragment menuOrderListFragment on OrderList {
    data {
      id
      ...menuItemOrderFragment
    }
  }

  ${menuItemOrderFragment}
`;

export const menuMenuFragment = gql`
  fragment menuMenuFragment on Menu {
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
      ...logoMenuDesignObjectTypeFragment
      ...menuItemMenuDesignObjectTypeFragment
      ...usePagesWithSearchBarFragment
    }
  }

  ${logoMenuDesignObjectTypeFragment}
  ${menuItemMenuPageObjectTypeFragment}
  ${menuItemMenuDesignObjectTypeFragment}
  ${usePagesWithSearchBarFragment}
`;

export const menuMenuModuleFragment = gql`
  fragment menuMenuModuleFragment on MenuModule {
    id
    menu {
      id
      ...menuMenuFragment
    }
    viewer {
      id
      ...logoUserFragment
      ...menuUserFragment
    }
    cart {
      ...menuOrderListFragment
    }
  }

  ${logoUserFragment}
  ${menuMenuFragment}
  ${menuUserFragment}
  ${menuOrderListFragment}
`;
