// import
import { gql } from '@apollo/client';

// definition
export const useAddNewMessageFragment = gql`
  fragment useAddNewMessageFragment on Order {
    id
    messages {
      text
      bearer
      createdAt
    }
  }
`;

export const addNewMessage = gql`
  mutation addNewMessage($input: AddOrderMessageInput!) {
    addOrderMessage(input: $input) {
      success
      reason
    }
  }
`;
