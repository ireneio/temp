// import
import gql from 'graphql-tag';

// graphql import
import {
  menuUserFragment,
  menuOrderListFragment,
  menuMenuFragment,
} from '@meepshop/menu/lib/gqls';

// definition
export const pageUserFragment = gql`
  fragment pageUserFragment on User {
    id
    store {
      id
      experiment {
        hiddingMeepshopMaxInFooterEnabled
      }
      logoImage {
        id
        scaledSrc {
          w60
        }
      }
      mobileLogoImage {
        id
        scaledSrc {
          w60
        }
      }
    }
    ...menuUserFragment
  }

  ${menuUserFragment}
`;

export const pageOrderListFragment = gql`
  fragment pageOrderListFragment on OrderList {
    ...menuOrderListFragment
  }

  ${menuOrderListFragment}
`;

export const pagePageFragment = gql`
  fragment pagePageFragment on Page {
    id
    container
    useBottom
    firstTop: fixedtop {
      menu {
        id
        ...menuMenuFragment
      }
    }
    secondTop: secondtop {
      menu {
        id
        ...menuMenuFragment
      }
    }
    sidebar {
      menu {
        id
        ...menuMenuFragment
      }
    }
    bottom: fixedbottom {
      menu {
        id
        ...menuMenuFragment
      }
    }
  }

  ${menuMenuFragment}
`;
