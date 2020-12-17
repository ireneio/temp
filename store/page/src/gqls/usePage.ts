// import
import gql from 'graphql-tag';

// graphql import
import {
  pageUserFragment,
  pageOrderListFragment,
  pagePageFragment,
} from '@meepshop/page/gqls';
import { groupFragment } from '@store/group/gqls';

// definition
const usePageFragment = gql`
  fragment usePageFragment on Query {
    viewer {
      id
      ...pageUserFragment
    }

    getCartList {
      ...pageOrderListFragment
    }
  }

  ${pageUserFragment}
  ${pageOrderListFragment}
`;

export const getHomePage = gql`
  query getHomePage($identity: String) {
    viewer {
      id
      store {
        id
        defaultHomePage {
          id
          ...groupFragment
          ...pagePageFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
  ${pagePageFragment}
`;

export const getCustomPage = gql`
  query getCustomPage($identity: String, $path: String!) {
    viewer {
      id
      store {
        id
        customPage(path: $path) {
          id
          ...groupFragment
          ...pagePageFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
  ${pagePageFragment}
`;

export const getProductPage = gql`
  query getProductPage($identity: String, $productId: ID!) {
    viewer {
      id
      store {
        id
        product(productId: $productId) {
          id
          page {
            id
            ...groupFragment
            ...pagePageFragment
          }
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
  ${pagePageFragment}
`;

export const getProductsPage = gql`
  query getProductsPage($identity: String) {
    viewer {
      id
      store {
        id
        defaultProductListPage {
          id
          ...groupFragment
          ...pagePageFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
  ${pagePageFragment}
`;
