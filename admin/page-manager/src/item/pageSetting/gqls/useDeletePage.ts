// import
import gql from 'graphql-tag';

// definition
export const useDeletePageReadCache = gql`
  query useDeletePageReadCache(
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

export const deletePage = gql`
  mutation deletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      status
    }
  }
`;
