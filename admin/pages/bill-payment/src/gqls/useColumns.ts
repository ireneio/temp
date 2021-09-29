// import
import gql from 'graphql-tag';

// definition
export const useColumnsFragment = gql`
  fragment useColumnsFragment on Store {
    id
    currency
  }
`;
