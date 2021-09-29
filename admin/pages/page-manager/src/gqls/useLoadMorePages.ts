// import
import gql from 'graphql-tag';

// graphql import
import {
  homePagesStoreFragment,
  customPagesStoreFragment,
  productTemplatePageStoreFragment,
} from './usePages';

// definition
export const getHomePages = gql`
  query getHomePages(
    $homePagesAfter: String
    $homePagesFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        ...homePagesStoreFragment
      }
    }
  }

  ${homePagesStoreFragment}
`;

export const getCustomPages = gql`
  query getCustomPages(
    $customPagesAfter: String
    $customPagesFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        ...customPagesStoreFragment
      }
    }
  }

  ${customPagesStoreFragment}
`;

export const getProductTemplatePage = gql`
  query getProductTemplatePage(
    $productTemplatePageAfter: String
    $productTemplatePageFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        ...productTemplatePageStoreFragment
      }
    }
  }

  ${productTemplatePageStoreFragment}
`;
