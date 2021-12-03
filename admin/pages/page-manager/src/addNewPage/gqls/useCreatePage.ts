// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
const useCreatePageFragment = gql`
  fragment useCreatePageFragment on PageEdge {
    node {
      id
      pageType
      title {
        ...localeFragment
      }
      isDefaultHomePage @client
      isDefaultProductTemplatePage @client
      path
      tabTitle
      seo {
        keywords
        description
        image
      }
    }
  }

  ${localeFragment}
`;

export const useCreatePageReadCache = gql`
  query useCreatePageReadCache(
    $homePagesFilter: StorePagesFilterInput
    $customPagesFilter: StorePagesFilterInput
    $productTemplatePageFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        homePages: pages(first: 20, filter: $homePagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        customPages: pages(first: 20, filter: $customPagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        productTemplatePage: pages(
          first: 20
          filter: $productTemplatePageFilter
        ) {
          edges {
            ...useCreatePageFragment
          }
        }
      }
    }
  }

  ${useCreatePageFragment}
`;

export const createPage = gql`
  mutation createPage($input: CreatePageInput!) {
    createPage(input: $input) {
      status
      newPage {
        ...useCreatePageFragment
      }
    }
  }

  ${useCreatePageFragment}
`;
