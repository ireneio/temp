// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

// graphql typescript
import {
  createOrder as createOrderType,
  createOrderVariables,
} from './__generated__/createOrder';
import { useCreateOrderFragment } from './__generated__/useCreateOrderFragment';
import { useCreateOrderGetRecipientAddressBookCache as useCreateOrderGetRecipientAddressBookCacheType } from './__generated__/useCreateOrderGetRecipientAddressBookCache';

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
  const [createOrder] = useMutation<createOrderType, createOrderVariables>(
    mutation,
  );

  return ({
    variables,
    ...options
  }: MutationHookOptions<createOrderType, createOrderVariables>) =>
    createOrder({
      ...options,
      variables,
      update: (cache: DataProxy, { data }: { data: createOrderType }) => {
        if (!data.createOrderList?.[0]?.id) return;

        const createOrderList =
          variables?.createOrderList instanceof Array
            ? variables?.createOrderList[0]
            : variables?.createOrderList;

        const name = createOrderList?.userInfo?.name;
        const mobile = createOrderList?.userInfo?.mobile;
        const address = createOrderList?.address;
        const saveRecipient =
          createOrderList?.shipments?.[0]?.recipient?.saveRecipient;

        if (!saveRecipient || !address) return;

        const useCreateOrderGetRecipientAddressBookCache = cache.readQuery<
          useCreateOrderGetRecipientAddressBookCacheType
        >({
          query: gql`
            query useCreateOrderGetRecipientAddressBookCache {
              viewer {
                id
                rewardPoint {
                  currentBalance
                }
                shippableRecipientAddresses {
                  id
                  name
                  mobile
                  country {
                    id
                  }
                  city {
                    id
                  }
                  area {
                    id
                  }
                  zipCode
                  street
                }
              }
            }
          `,
        });

        const { id, shippableRecipientAddresses } =
          useCreateOrderGetRecipientAddressBookCache?.viewer || {};
        const currentBalance =
          useCreateOrderGetRecipientAddressBookCache?.viewer?.rewardPoint
            ?.currentBalance || 0;

        if (!id) return;

        cache.writeFragment<useCreateOrderFragment>({
          id,
          fragment: gql`
            fragment useCreateOrderFragment on User {
              id
              rewardPoint {
                currentBalance
              }
              shippableRecipientAddresses {
                id
                name
                mobile
                country {
                  id
                }
                city {
                  id
                }
                area {
                  id
                }
                zipCode
                street
              }
            }
          `,
          data: {
            __typename: 'User',
            id,
            rewardPoint: {
              __typename: 'UserRewardPoint',
              currentBalance: currentBalance - (createOrderList?.points || 0),
            },
            shippableRecipientAddresses: [
              ...(shippableRecipientAddresses || []),
              {
                __typename: 'RecipientAddress',
                // FIXME: createOrder should return the new recipientAddress id
                id: uuid(),
                name,
                mobile,
                country: {
                  __typename: 'Country',
                  id: address.countryId,
                },
                city: !address.cityId
                  ? null
                  : {
                      __typename: 'City',
                      id: address.cityId,
                    },
                area: !address.areaId
                  ? null
                  : {
                      __typename: 'Area',
                      id: address.areaId,
                    },
                zipCode: address.zipCode,
                street: address.street,
              },
            ],
          } as useCreateOrderFragment,
        });
      },
    });
};
