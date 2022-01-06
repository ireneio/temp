// typescript import
import { MutationFunction, MutationFunctionOptions } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  createOrder as createOrderType,
  createOrderVariables as createOrderVariablesType,
  useCreateUserFragment as useCreateUserFragmentType,
  updateOrders as updateOrdersType,
} from '@meepshop/types/gqls/store';

// graphql import
import { createOrder, updateOrders } from '../gqls/useCreateOrder';

// definition
export default (
  viewer: useCreateUserFragmentType | null,
): MutationFunction<createOrderType, createOrderVariablesType> => {
  const [mutation] = useMutation<createOrderType, createOrderVariablesType>(
    createOrder,
  );

  return useCallback(
    // FIXME: should not use MutationFunctionOptions
    async ({
      variables,
      ...options
    }: MutationFunctionOptions<createOrderType, createOrderVariablesType>) => {
      const result = await mutation({
        ...options,
        variables,
        update: (cache, { data }) => {
          if (!data?.createOrder || !viewer || !variables) return;

          const countryId = variables.input?.address?.countryId;
          const cityId = variables.input?.address?.cityId;
          const areaId = variables.input?.address?.areaId;

          cache.writeQuery<updateOrdersType>({
            query: updateOrders,
            data: {
              viewer: {
                __typename: 'User',
                id: viewer?.id || 'userId' /** SHOULD_NOT_BE_NULL */,
                hasGmoCreditCard:
                  variables.input.payment.gmo?.isRememberCard ??
                  viewer.hasGmoCreditCard,
                orders: !viewer.orders
                  ? null
                  : {
                      __typename: 'OrderConnection',
                      edges: [
                        {
                          __typename: 'OrderEdge',
                          node: {
                            __typename: 'Order',
                            id:
                              data.createOrder.order?.id ||
                              'orderId' /** SHOULD_NOT_BE_NULL */,
                          },
                        },
                        ...viewer.orders.edges,
                      ],
                      total: viewer.orders.total + 1,
                    },
                shippableRecipientAddresses: !variables.input.shipment.recipient
                  ?.saveRecipient
                  ? viewer.shippableRecipientAddresses
                  : [
                      ...viewer.shippableRecipientAddresses,
                      {
                        __typename: 'RecipientAddress',
                        id:
                          data.createOrder.recipientId ||
                          'recipientId' /** SHOULD_NOT_BE_NULL */,
                        name: !variables.input.shipment.recipient?.name
                          ? null
                          : variables.input.shipment.recipient.name,
                        mobile: !variables.input.shipment.recipient?.mobile
                          ? null
                          : variables.input.shipment.recipient.mobile,
                        country: !countryId
                          ? null
                          : {
                              __typename: 'Country',
                              id: countryId,
                            },
                        city: !cityId
                          ? null
                          : {
                              __typename: 'City',
                              id: cityId,
                            },
                        area: !areaId
                          ? null
                          : {
                              __typename: 'Area',
                              id: areaId,
                            },
                        zipCode: variables.input.address?.zipCode || null,
                        street: variables.input.address?.street || null,
                      },
                    ],
              },
              getCartList: {
                __typename: 'OrderList',
                data: [],
              },
            },
          });
        },
      });

      return result;
    },
    [mutation, viewer],
  );
};
