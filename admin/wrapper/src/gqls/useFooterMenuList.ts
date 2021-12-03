// import
import { gql } from '@apollo/client';

// definition
export const useFooterMenuListFragment = gql`
  fragment useFooterMenuListFragment on Store {
    domain
    defaultDomain
  }
`;
