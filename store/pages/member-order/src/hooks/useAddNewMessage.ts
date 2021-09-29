// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { formatRFC3339 } from 'date-fns';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  MessageBearer,
  addNewMessage as addNewMessageType,
  addNewMessageVariables as addNewMessageVariablesType,
  useAddNewMessageFragment as useAddNewMessageFragmentType,
  useAddNewMessageFragment_messages as useAddNewMessageFragmentMessagesType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  addNewMessage,
  useAddNewMessageFragment,
} from '../gqls/useAddNewMessage';

// definition
export default (
  order: useAddNewMessageFragmentType,
): {
  newMessage: string;
  setNewMessage: (message: string) => void;
  addNewMessage: () => void;
} => {
  const { t } = useTranslation('member-order');
  const [mutation] = useMutation<addNewMessageType, addNewMessageVariablesType>(
    addNewMessage,
  );
  const [newMessage, setNewMessage] = useState<string>('');

  const { id: orderId, messages } = order;

  return {
    newMessage,
    setNewMessage,
    addNewMessage: useCallback(() => {
      if (!orderId) return;

      mutation({
        variables: {
          input: {
            orderId,
            text: newMessage,
          },
        },
        update: (cache: DataProxy, { data }: { data: addNewMessageType }) => {
          const {
            addOrderMessage: { success, reason },
          } = data;

          if (!success) {
            notification.error({
              message: t('qa.error'),
              description: reason,
            });

            return;
          }

          const filterMessages = messages.filter(
            Boolean,
          ) as useAddNewMessageFragmentMessagesType[];

          cache.writeFragment<useAddNewMessageFragmentType>({
            id: orderId,
            fragment: useAddNewMessageFragment,
            data: {
              __typename: 'Order',
              id: orderId,
              messages: [
                ...filterMessages.map(msg => ({
                  ...msg,
                  __typename: 'OrderMessage' as const,
                })),
                {
                  __typename: 'OrderMessage',
                  text: newMessage,
                  bearer: 'CUSTOMER' as MessageBearer,
                  createdAt: formatRFC3339(new Date()),
                },
              ],
            },
          });

          setNewMessage('');
          notification.success({ message: t('qa.success') });
        },
      });
    }, [mutation, t, orderId, messages, newMessage]),
  };
};
