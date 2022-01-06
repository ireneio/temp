// import
import { gql } from '@apollo/client';

// definition
export const signup = gql`
  mutation signup($search: [NewUser]) {
    createUserList(createUserList: $search) {
      id
    }
  }
`;
