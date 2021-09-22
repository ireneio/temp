// import
import gql from 'graphql-tag';

// graphql import
import { pageUserFragment, pagePageFragment } from '@meepshop/page/gqls';

import { editorFragment } from '../editor/gqls';

// definition
export const getPageEditorPage = gql`
  query getPageEditorPage($input: StorePageFilterInput, $identity: String) {
    viewer {
      id
      store {
        id
        page(input: $input) {
          id

          ...pagePageFragment
          ...editorFragment
        }
      }

      ...pageUserFragment
    }
  }

  ${pageUserFragment}
  ${pagePageFragment}
  ${editorFragment}
`;
