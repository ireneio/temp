// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  setOrderMessageReplied as setOrderMessageRepliedType,
  setOrderMessageRepliedVariables as setOrderMessageRepliedVariablesType,
  useSetOrderMessageRepliedFragment as useSetOrderMessageRepliedFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useSetOrderMessageRepliedFragment,
  setOrderMessageReplied,
} from '../gqls/useSetOrderMessageReplied';

// definition
export default (orderId: string): (() => void) => {
  const [mutation] = useMutation<
    setOrderMessageRepliedType,
    setOrderMessageRepliedVariablesType
  >(setOrderMessageReplied);

  return useCallback(() => {
    mutation({
      variables: {
        input: {
          orderId,
        },
      },
      update: (cache, { data }) => {
        if (!data?.setOrderMessageReplied.success) return;

        cache.writeFragment<useSetOrderMessageRepliedFragmentType>({
          id: orderId,
          fragment: useSetOrderMessageRepliedFragment,
          data: {
            __typename: 'Order',
            id: orderId,
            messageReplied: true,
          },
        });
      },
    });
  }, [mutation, orderId]);
};
