// import
import gql from 'graphql-tag';

// graphql import
import {
  pageUserFragment,
  pageOrderListFragment,
  pagePageFragment,
} from '@meepshop/page/lib/gqls';
import { groupFragment } from '@store/group/lib/gqls';

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
  query getHomePage($smartConversionToken: String) {
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
  query getCustomPage($smartConversionToken: String, $path: String!) {
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
  query getProductPage($smartConversionToken: String, $productId: ID!) {
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
  query getProductsPage($smartConversionToken: String) {
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
