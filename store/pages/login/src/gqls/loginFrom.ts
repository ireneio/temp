// import
import { gql } from '@apollo/client';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

// definition
export const loginFormFragment = gql`
  fragment loginFormFragment on LineLoginSetting {
    isLoginEnabled
    ...lineFragment
  }

  ${lineFragment}
`;
