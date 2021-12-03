// import
import { gql } from '@apollo/client';

// definition
export const isStoreCnameUsable = gql`
  query isStoreCnameUsable($cname: String!) {
    isStoreCnameUsable(cname: $cname) {
      result
    }
  }
`;
