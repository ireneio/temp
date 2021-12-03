// import
import { gql } from '@apollo/client';

// graphql import
import { previewerStoreFragment } from './previewer';
import { usePagesStoreFragment } from './usePages';

// definition
export const getPages = gql`
  query getPages(
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
        ...previewerStoreFragment
        ...usePagesStoreFragment
        id
      }
    }
  }

  ${previewerStoreFragment}
  ${usePagesStoreFragment}
`;
