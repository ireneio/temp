// import
import { gql } from '@apollo/client';

// definition
export const kooLiveFragment = gql`
  fragment kooLiveFragment on Store {
    id
    cname
  }
`;
