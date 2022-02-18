// import
import { gql } from '@apollo/client';

// definition
export const useAddNewMessageFragment = gql`
  fragment useAddNewMessageFragment on Order {
    id
    messageReplied
    messages {
      text
      bearer
      createdAt
    }
  }
`;

export const addOrderMessage = gql`
  mutation addOrderMessage($input: AddOrderMessageInput!) {
    addOrderMessage(input: $input) {
      success
    }
  }
`;
