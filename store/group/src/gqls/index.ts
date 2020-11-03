// import
import gql from 'graphql-tag';

// graphql import
import { modulesFragment } from '@meepshop/modules/lib/gqls';

// definition
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
