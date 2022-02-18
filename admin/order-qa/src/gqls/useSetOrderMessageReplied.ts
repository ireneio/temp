// import
import { gql } from '@apollo/client';

// definition
export const useSetOrderMessageRepliedFragment = gql`
  fragment useSetOrderMessageRepliedFragment on Order {
    id
    messageReplied
  }
`;

export const setOrderMessageReplied = gql`
  mutation setOrderMessageReplied($input: SetOrderMessageRepliedInput!) {
    setOrderMessageReplied(input: $input) {
      success
    }
  }
`;
