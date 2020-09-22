// typescript import
import { MutationFunction } from '@apollo/react-common';

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
  >(mutation, {
    // FIXME: should update order, orders, hasGmoCreditCard, user, shippableRecipientAddresses
    onCompleted: () => {
      if (!client) return;

      client.resetStore();
    },
  });

  return createOrder;
};
