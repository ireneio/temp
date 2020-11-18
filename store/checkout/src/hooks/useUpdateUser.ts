// FIXME: should remove, backend should update user when creating user
// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  updateUserAfterCreatingOrder as updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables,
} from '../gqls/__generated__/updateUserAfterCreatingOrder';
import { getUserCache as getUserCacheType } from '../gqls/__generated__/getUserCache';
import { useUpdateUserFragment as useUpdateUserFragmentType } from '../gqls/__generated__/useUpdateUserFragment';

// graphql import
import {
  updateUserAfterCreatingOrder,
  getUserCache,
  useUpdateUserFragment,
} from '../gqls/useUpdateUser';

// definition
export default (): MutationFunction<
  updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables
> => {
  const [mutation] = useMutation<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >(updateUserAfterCreatingOrder);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >) =>
    mutation({
      ...options,
      variables,
      update: (
        cache: DataProxy,
        { data }: { data: updateUserAfterCreatingOrderType },
      ) => {
        if (data.updateShopperInformation.status !== 'OK' || !variables) return;

        const userCache = cache.readQuery<getUserCacheType>({
          query: getUserCache,
        });

        const { id } = userCache?.viewer || {};
        const countryId = variables.input?.address?.countryId;
        const cityId = variables.input?.address?.cityId;
        const areaId = variables.input?.address?.areaId;

        if (!id) return;

        cache.writeFragment<useUpdateUserFragmentType>({
          id,
          fragment: useUpdateUserFragment,
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
