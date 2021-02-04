// import
import gql from 'graphql-tag';

// definition
export const useDeletePageReadCache = gql`
  query useDeletePageReadCache(
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

export const deletePage = gql`
  mutation deletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      status
    }
  }
`;
