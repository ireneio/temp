// import
import { gql } from '@apollo/client';

// graphql import
import { pageUserFragment, pagePageFragment } from '@meepshop/page/gqls';

import { headerStoreFragment } from './header';
import { sidebarFragment } from '../sidebar/gqls';
import { editorFragment } from '../editor/gqls';

// definition
export const getPageEditorPage = gql`
  query getPageEditorPage($input: StorePageFilterInput) {
    viewer {
      id
      store {
        id
        page(input: $input) {
          id
          ...pagePageFragment
          ...editorFragment
        }
        ...headerStoreFragment
        ...sidebarFragment
      }
      ...pageUserFragment
    }
  }

  ${pageUserFragment}
  ${pagePageFragment}
  ${headerStoreFragment}
  ${sidebarFragment}
  ${editorFragment}
`;
