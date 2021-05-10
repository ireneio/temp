// import
import gql from 'graphql-tag';

// definition
export const isStoreCnameUsable = gql`
  query isStoreCnameUsable($cname: String!) {
    isStoreCnameUsable(cname: $cname) {
      result
    }
  }
`;
