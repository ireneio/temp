// import
import gql from 'graphql-tag';

// graphql import
import { pageFragment } from '@meepshop/page/lib/gqls';
import { groupFragment } from '@store/group/lib/gqls';

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
    }
  }

  ${pageFragment}
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
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
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
        }
      }
    }
    ...usePageFragment
  }

  ${usePageFragment}
  ${groupFragment}
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
  query getProductsPage($smartConversionToken: String) {
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
