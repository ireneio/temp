// import
import { gql } from '@apollo/client';

// definition
export const checkEmail = gql`
  query checkEmail($search: searchInputObjectType) {
    checkUserInfo(search: $search) {
      exists
    }
  }
`;
