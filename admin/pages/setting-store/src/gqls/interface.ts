// import
import { gql } from '@apollo/client';

// definition
export const interfaceFragment = gql`
  fragment interfaceFragment on Store {
    id
    currency
  }
`;
