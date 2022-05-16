// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
const useDuplicatePageFragment = gql`
  fragment useDuplicatePageFragment on PageEdge {
    node {
      id
      pageType
      title {
        ...localeFragment
      }
      isDefaultHomePage
      isDefaultProductTemplatePage
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

export const useDuplicatePageReadCache = gql`
  query useDuplicatePageReadCache(
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
            ...useDuplicatePageFragment
          }
        }

        customPages: pages(
          first: 20
          after: $customPagesAfter
          filter: $customPagesFilter
        ) {
          edges {
            ...useDuplicatePageFragment
          }
        }

        productTemplatePage: pages(
          first: 20
          after: $productTemplatePageAfter
          filter: $productTemplatePageFilter
        ) {
          edges {
            ...useDuplicatePageFragment
          }
        }
      }
    }
  }

  ${useDuplicatePageFragment}
`;

export const duplicatePage = gql`
  mutation duplicatePage($input: DuplicatePageInput!) {
    duplicatePage(input: $input) {
      status
      duplicatedPage {
        ...useDuplicatePageFragment
      }
    }
  }

  ${useDuplicatePageFragment}
`;
