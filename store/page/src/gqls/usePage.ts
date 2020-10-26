// import
import gql from 'graphql-tag';

// graphql import
import pageFragment from '@meepshop/page/lib/gqls';
import {
  groupFragment,
  contextUserFragment,
  contextOrderFragment,
} from '@store/group/lib/gqls';

// definition
const usePageFragment = gql`
  fragment usePageFragment on Query {
    viewer {
      id
      store {
        id
        experiment {
          ...pageFragment
        }
      }
      ...contextUserFragment
    }

    getCartList(search: { showDetail: true }) {
      data {
        id
        ...contextOrderFragment
      }
    }
  }

  ${pageFragment}
  ${contextUserFragment}
  ${contextOrderFragment}
`;

export const getHomePage = gql`
  query getHomePage($productId: ID) {
    viewer {
      id
      store {
        id
        defaultHomePage {
          id
          ...groupFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
`;

export const getCustomPage = gql`
  query getCustomPage($path: String!, $productId: ID) {
    viewer {
      id
      store {
        id
        customPage(path: $path) {
          id
          ...groupFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
`;

export const getProductPage = gql`
  query getProductPage($productId: ID!) {
    viewer {
      id
      store {
        id
        product(productId: $productId) {
          id
          page {
            id
            ...groupFragment
          }
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
`;

export const getProductsPage = gql`
  query getProductsPage($productId: ID) {
    viewer {
      id
      store {
        id
        defaultProductListPage {
          id
          ...groupFragment
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
`;
