// import
import gql from 'graphql-tag';

// definition
export const useRenamePageWithSEOCache = gql`
  query useRenamePageWithSEOCache(
    $homePagesFilter: StorePagesFilterInput
    $customPagesFilter: StorePagesFilterInput
    $productTemplatePageFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        homePages: pages(first: 500, filter: $homePagesFilter) {
          edges {
            node {
              id
            }
          }
        }

        customPages: pages(first: 500, filter: $customPagesFilter) {
          edges {
            node {
              id
            }
          }
        }

        productTemplatePage: pages(
          first: 500
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
