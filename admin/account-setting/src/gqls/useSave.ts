// import
import gql from 'graphql-tag';

// graphql import
import { accountFragment } from './account';

// definition
export const updateUserList = gql`
  mutation updateUserList($updateUserList: [UpdateUser]) {
    updateUserList(updateUserList: $updateUserList) {
      id
      ...accountFragment
    }
  }

  ${accountFragment}
`;
