// import
import { gql } from '@apollo/client';

// definition
export const useRenamePageWithSEOCache = gql`
  query useRenamePageWithSEOCache(
    $homePagesAfter: String
    $homePagesFilter: StorePagesFilterInput
    $customPagesAfter: String
    $customPagesFilter: StorePagesFilterInput
    $productTemplatePageAfter: String
    $productTemplatePageFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        homePages: pages(
          first: 20
          after: $homePagesAfter
          filter: $homePagesFilter
        ) {
          edges {
            node {
              id
            }
          }
        }

        customPages: pages(
          first: 20
          after: $customPagesAfter
          filter: $customPagesFilter
        ) {
          edges {
            node {
              id
            }
          }
        }

        productTemplatePage: pages(
          first: 20
          after: $productTemplatePageAfter
          filter: $productTemplatePageFilter
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

export const renamePageWithSEO = gql`
  mutation renamePageWithSEO($input: RenamePageWithSEOInput!) {
    renamePageWithSEO(input: $input) {
      status
    }
  }
`;

export const useRenamePageWithSEOFragment = gql`
  fragment useRenamePageWithSEOFragment on Page {
    id
    title {
      zh_TW
    }
    path
    tabTitle
    seo {
      keywords
      description
      image
    }
  }
`;
