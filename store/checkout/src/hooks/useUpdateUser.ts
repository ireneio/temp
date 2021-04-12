// FIXME: should remove, backend should update user when creating user
// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  updateUserAfterCreatingOrder as updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables,
  useUpdateUserFragment as useUpdateUserFragmentType,
  useUpdateUserFragment_store_setting_checkoutFields as useUpdateUserFragmentStoreSettingCheckoutFields,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  updateUserAfterCreatingOrder,
  useUpdateUserFragment,
} from '../gqls/useUpdateUser';

// typescript definition
type OptionType = MutationHookOptions<
  updateUserAfterCreatingOrderType,
  updateUserAfterCreatingOrderVariables
>;

// definition
export default (
  viewer: useUpdateUserFragmentType | null,
): ((option: OptionType) => Promise<void>) => {
  const [mutation] = useMutation<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >(updateUserAfterCreatingOrder);

  return useCallback(
    async ({ variables, ...options }: OptionType) => {
      const checkoutFields = viewer?.store?.setting?.checkoutFields;

      if (
        !checkoutFields ||
        Object.keys(checkoutFields).every(
          (key: keyof useUpdateUserFragmentStoreSettingCheckoutFields) =>
            key === '__typename' || checkoutFields[key] === 'HIDDEN',
        )
      )
        return;

      await mutation({
        ...options,
        variables,
        update: (
          cache: DataProxy,
          { data }: { data: updateUserAfterCreatingOrderType },
        ) => {
          if (
            data.updateShopperInformation.status !== 'OK' ||
            !variables ||
            !viewer?.id
          )
            return;

          const countryId = variables.input?.address?.countryId;
          const cityId = variables.input?.address?.cityId;
          const areaId = variables.input?.address?.areaId;

          cache.writeFragment<useUpdateUserFragmentType>({
            id: viewer.id,
            fragment: useUpdateUserFragment,
            data: {
              ...viewer,
              name:
                checkoutFields.name === 'HIDDEN'
                  ? viewer.name
                  : variables.input?.name || null,
              additionalInfo:
                checkoutFields.mobile === 'HIDDEN'
                  ? viewer.additionalInfo
                  : {
                      __typename: 'AdditionalInfoObjectType',
                      mobile: variables.input?.additionalInfo?.mobile || null,
                    },
              address:
                checkoutFields.address === 'HIDDEN'
                  ? viewer.address
                  : {
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
    },
    [viewer, mutation],
  );
};
