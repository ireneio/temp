// FIXME: should remove, backend should update user when creating user
// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  updateUserAfterCreatingOrder as updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables,
} from './__generated__/updateUserAfterCreatingOrder';
import { useUpdateUserCache as useUpdateUserCacheType } from './__generated__/useUpdateUserCache';
import { useUpdateUserUpdateCache } from './__generated__/useUpdateUserUpdateCache';

// definition
const mutation = gql`
  mutation updateUserAfterCreatingOrder($input: UpdateShopperInfoInput!) {
    updateShopperInformation(input: $input) {
      status
    }
  }
`;

export default (): MutationFunction<
  updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables
> => {
  const [updateUserAfterCreatingOrder] = useMutation<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >(mutation);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >) =>
    updateUserAfterCreatingOrder({
      ...options,
      variables,
      update: (
        cache: DataProxy,
        { data }: { data: updateUserAfterCreatingOrderType },
      ) => {
        if (data.updateShopperInformation.status !== 'OK' || !variables) return;

        const useUpdateUserCache = cache.readQuery<useUpdateUserCacheType>({
          query: gql`
            query useUpdateUserCache {
              viewer {
                id
              }
            }
          `,
        });

        const { id } = useUpdateUserCache?.viewer || {};
        const countryId = variables.input?.address?.countryId;
        const cityId = variables.input?.address?.cityId;
        const areaId = variables.input?.address?.areaId;

        if (!id) return;

        cache.writeFragment<useUpdateUserUpdateCache>({
          id,
          fragment: gql`
            fragment useUpdateUserUpdateCache on User {
              id
              name
              additionalInfo {
                mobile
              }
              address {
                country {
                  id
                }
                city {
                  id
                }
                area {
                  id
                }
                street
                zipCode
              }
            }
          `,
          data: {
            __typename: 'User',
            id,
            name: variables.input?.name || null,
            additionalInfo: {
              __typename: 'AdditionalInfoObjectType',
              mobile: variables.input?.additionalInfo?.mobile || null,
            },
            address: {
              __typename: 'Address',
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
              street: variables.input?.address?.street || null,
              zipCode: variables.input?.address?.zipCode || null,
            },
          },
        });
      },
    });
};
