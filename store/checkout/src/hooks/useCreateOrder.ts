// typescript import
import {
  MutationFunction,
  MutationFunctionOptions,
} from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  createOrder as createOrderType,
  createOrderVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import { createOrder } from '../gqls/useCreateOrder';

// definition
export default (): MutationFunction<createOrderType, createOrderVariables> => {
  const [mutation, { client }] = useMutation<
    createOrderType,
    createOrderVariables
  >(createOrder);

  return useCallback(
    async ({
      variables,
      ...options
    }: MutationFunctionOptions<createOrderType, createOrderVariables>) => {
      const result = await mutation({
        ...options,
        variables,
      });

      // FIXME: should update order, orders, hasGmoCreditCard, user, shippableRecipientAddresses
      if (client) await client.resetStore();

      return result;
    },
    [mutation, client],
  );
};
