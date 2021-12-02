// import
import { gql } from '@apollo/client';

// definition
export const useFormatFragment = gql`
  fragment useFormatFragment on Store {
    id
    currency
  }
`;
