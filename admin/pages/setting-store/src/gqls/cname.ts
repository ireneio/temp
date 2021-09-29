// import
import gql from 'graphql-tag';

// definition
export const cnameFragment = gql`
  fragment cnameFragment on Store {
    id
    cname
  }
`;
