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
import { stylesFragment } from './styles';
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
    logoAlignment
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
      alignment
      expandSubItem
      normal: nornal {
        color
        background
      }
      opacity
      font
      fontSize
      ...logoMenuDesignObjectTypeFragment
      ...menuItemMenuDesignObjectTypeFragment
      ...stylesFragment
      ...usePagesWithSearchBarFragment
    }
  }

  ${logoMenuDesignObjectTypeFragment}
  ${menuItemMenuPageObjectTypeFragment}
  ${menuItemMenuDesignObjectTypeFragment}
  ${stylesFragment}
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
