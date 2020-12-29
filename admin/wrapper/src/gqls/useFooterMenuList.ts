// import
import gql from 'graphql-tag';

// definition
export const useFooterMenuListFragment = gql`
  fragment useFooterMenuListFragment on Store {
    domain
    defaultDomain
  }
`;
