// typescript import
import {
  MutationFunction,
  MutationFunctionOptions,
} from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  createOrder as createOrderType,
  createOrderVariables,
} from './__generated__/createOrder';

// graphql import
import createOrderFragment from '@meepshop/utils/lib/fragments/createOrder';

// definition
const mutation = gql`
  mutation createOrder($createOrderList: [NewOrder]) {
    createOrderList(createOrderList: $createOrderList) {
      id
      ...createOrderFragment
    }
  }

  ${createOrderFragment}
`;

export default (): MutationFunction<createOrderType, createOrderVariables> => {
  const [createOrder, { client }] = useMutation<
    createOrderType,
    createOrderVariables
  >(mutation);

  return async ({
    variables,
    ...options
  }: MutationFunctionOptions<createOrderType, createOrderVariables>) => {
    const result = await createOrder({
      ...options,
      variables,
    });

    // FIXME: should update order, orders, hasGmoCreditCard, user, shippableRecipientAddresses
    if (client && !variables?.createOrderList?.[0]?.userInfo?.password)
      await client.resetStore();

    return result;
  };
};
