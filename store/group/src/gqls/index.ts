// import
import gql from 'graphql-tag';

// graphql import
import {
  modulesFragment,
  contextUserFragment,
  contextOrderFragment,
} from '@meepshop/modules';

// definition
export { contextUserFragment, contextOrderFragment };

export const groupFragment = gql`
  fragment groupFragment on Page {
    id
    width
    modules {
      ...modulesFragment
    }
  }

  ${modulesFragment}
`;
