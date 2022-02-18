// import
import { gql } from '@apollo/client';

import { useAddNewMessageFragment } from './useAddNewMessage';
import { useSetOrderMessageRepliedFragment } from './useSetOrderMessageReplied';

// definition
export const getOrderMessage = gql`
  query getOrderMessage($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        messages {
          text
          bearer
          createdAt
        }
        ...useAddNewMessageFragment
        ...useSetOrderMessageRepliedFragment
      }
    }
  }

  ${useAddNewMessageFragment}
  ${useSetOrderMessageRepliedFragment}
`;
