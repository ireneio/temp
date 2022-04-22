// import
import { gql } from '@apollo/client';

// definition
export const firstPurchaseSignUp = gql`
  mutation firstPurchaseSignUp($createUserList: [NewUser]) {
    createUserList(createUserList: $createUserList) {
      id
    }
  }
`;

export const firstPurchaseLogin = gql`
  mutation firstPurchaseLogin($input: LoginInput!) {
    login(input: $input) @client {
      status
    }
  }
`;
