// import
import { gql } from '@apollo/client';

// definition
export const pageInfoFragment = gql`
  fragment pageInfoFragment on CurrentInfo {
    id
    current
  }
`;
