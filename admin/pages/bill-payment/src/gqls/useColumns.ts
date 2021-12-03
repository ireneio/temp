// import
import { gql } from '@apollo/client';

// definition
export const useColumnsFragment = gql`
  fragment useColumnsFragment on Store {
    id
    currency
  }
`;
