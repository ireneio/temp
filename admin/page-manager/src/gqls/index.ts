// import
import gql from 'graphql-tag';

// graphql import
import { previewerStoreFragment } from './previewer';
import { usePagesStoreFragment } from './usePages';

// definition
export const getPages = gql`
  query getPages(
    $homePagesFilter: StorePagesFilterInput
    $customPagesFilter: StorePagesFilterInput
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
