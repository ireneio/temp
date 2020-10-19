// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment pageInfoFragment on CurrentInfo {
    id
    current
  }
`;
