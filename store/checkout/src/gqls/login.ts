// import
import { gql } from '@apollo/client';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

// definition
export const loginFragment = gql`
  fragment loginFragment on Store {
    id
    lineLoginSetting {
      ...lineFragment
    }
  }

  ${lineFragment}
`;
