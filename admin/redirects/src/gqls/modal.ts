// import
import gql from 'graphql-tag';

// definition
export const modalFragmet = gql`
  fragment modalFragmet on Store {
    id
    domain
    defaultDomain
    routingRules {
      id
      fromPath
      toPath
    }
  }
`;
