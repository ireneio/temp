// import
import gql from 'graphql-tag';

// definition
export const checkEmail = gql`
  query checkEmail($search: searchInputObjectType) {
    checkUserInfo(search: $search) {
      exists
    }
  }
`;
