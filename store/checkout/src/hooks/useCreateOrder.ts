// typescript import
import {
  MutationFunction,
  MutationFunctionOptions,
} from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  createOrder as createOrderType,
  createOrderVariables,
} from '../gqls/__generated__/createOrder';

// graphql import
import { createOrder } from '../gqls/useCreateOrder';

// definition
export default (): MutationFunction<createOrderType, createOrderVariables> => {
  const [mutation, { client }] = useMutation<
    createOrderType,
    createOrderVariables
  >(createOrder);

  return async ({
    variables,
    ...options
  }: MutationFunctionOptions<createOrderType, createOrderVariables>) => {
    const result = await mutation({
      ...options,
      variables,
    });

    // FIXME: should update order, orders, hasGmoCreditCard, user, shippableRecipientAddresses
    if (client && !variables?.createOrderList?.[0]?.userInfo?.password)
      await client.resetStore();

    return result;
  };
};
