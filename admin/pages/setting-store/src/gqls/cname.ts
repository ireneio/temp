// import
import { gql } from '@apollo/client';

// definition
export const cnameFragment = gql`
  fragment cnameFragment on Store {
    id
    cname
  }
`;
