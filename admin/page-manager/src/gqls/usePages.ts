// import
import gql from 'graphql-tag';

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

export const usePagesStoreFragment = gql`
  fragment usePagesStoreFragment on Store {
    ...itemStoreFragment

    id
    homePages: pages(first: 500, filter: $homePagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    customPages: pages(first: 500, filter: $customPagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    defaultProductListPage {
      ...usePagesPageFragment
    }

    productTemplatePage: pages(first: 500, filter: $productTemplatePageFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }
  }

  ${usePagesPageFragment}
  ${itemStoreFragment}
`;
