// import
import gql from 'graphql-tag';

// graphql import
import { modulesFragment } from '@meepshop/modules/gqls';

// definition
export const editorFragment = gql`
  fragment editorFragment on Page {
    id
    width
    modules {
      ...modulesFragment
    }
  }

  ${modulesFragment}
`;
