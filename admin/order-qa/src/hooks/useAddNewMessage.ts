// import
import { useCallback, useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';

// graphql typescript
import {
  MessageBearer as MessageBearerType,
  addOrderMessage as addOrderMessageType,
  addOrderMessageVariables as addOrderMessageVariablesType,
  useAddNewMessageFragment as useAddNewMessageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  addOrderMessage,
  useAddNewMessageFragment,
} from '../gqls/useAddNewMessage';

// definition
export default (
  order: useAddNewMessageFragmentType | null,
): {
  messageContentRef: React.RefObject<HTMLDivElement>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  addNewMessage: () => void;
} => {
  const messageContentRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [mutation] = useMutation<
    addOrderMessageType,
    addOrderMessageVariablesType
  >(addOrderMessage);

  useEffect(() => {
    if (messageContentRef.current) {
      messageContentRef.current.scrollTop =
        messageContentRef.current.scrollHeight;
    }
  }, [order]);

  return {
    messageContentRef,
    newMessage,
    setNewMessage,
    addNewMessage: useCallback(() => {
      if (!order?.id) return;

      mutation({
        variables: {
          input: {
            orderId: order.id,
            text: newMessage,
          },
        },
        update: (cache, { data }) => {
          if (!order?.id || !data?.addOrderMessage.success) return;

          setNewMessage('');

          cache.writeFragment<useAddNewMessageFragmentType>({
            id: order.id,
            fragment: useAddNewMessageFragment,
            data: {
              __typename: 'Order',
              id: order.id,
              messageReplied: true,
              messages: [
                ...order.messages,
                {
                  __typename: 'OrderMessage',
                  text: newMessage,
                  bearer: 'STORE' as MessageBearerType,
                  createdAt: formatISO(new Date()),
                },
              ],
            },
          });
        },
      });
    }, [mutation, newMessage, order]),
  };
};
