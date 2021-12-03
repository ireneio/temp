// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { previewerPageFragment } from './previewer';
import { itemStoreFragment, itemPageFragment } from '../item/gqls';

// definition
const usePagesPageFragment = gql`
  fragment usePagesPageFragment on Page {
    ...itemPageFragment
    ...previewerPageFragment
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
  ${itemPageFragment}
  ${previewerPageFragment}
`;

export const homePagesStoreFragment = gql`
  fragment homePagesStoreFragment on Store {
    id
    homePages: pages(
      first: 20
      after: $homePagesAfter
      filter: $homePagesFilter
    ) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  ${usePagesPageFragment}
`;

export const customPagesStoreFragment = gql`
  fragment customPagesStoreFragment on Store {
    id
    customPages: pages(
      first: 20
      after: $customPagesAfter
      filter: $customPagesFilter
    ) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  ${usePagesPageFragment}
`;

export const productTemplatePageStoreFragment = gql`
  fragment productTemplatePageStoreFragment on Store {
    id
    productTemplatePage: pages(
      first: 20
      after: $productTemplatePageAfter
      filter: $productTemplatePageFilter
    ) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  ${usePagesPageFragment}
`;

export const usePagesStoreFragment = gql`
  fragment usePagesStoreFragment on Store {
    id
    defaultProductListPage {
      ...usePagesPageFragment
    }
    ...itemStoreFragment
    ...homePagesStoreFragment
    ...customPagesStoreFragment
    ...productTemplatePageStoreFragment
  }

  ${usePagesPageFragment}
  ${itemStoreFragment}
  ${homePagesStoreFragment}
  ${customPagesStoreFragment}
  ${productTemplatePageStoreFragment}
`;
