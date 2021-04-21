// import
import gql from 'graphql-tag';

// definition
export const domainFragment = gql`
  fragment domainFragment on Store {
    id
    domain
  }
`;
