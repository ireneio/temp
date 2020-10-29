// import
import gql from 'graphql-tag';

// definition
export const pageInfoFragment = gql`
  fragment pageInfoFragment on CurrentInfo {
    id
    current
  }
`;
