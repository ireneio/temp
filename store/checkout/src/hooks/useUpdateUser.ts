// FIXME: should remove, backend should update user when creating order
// typescript import
import { DataProxy } from '@apollo/client';

import { ValuesType } from './useSave';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { areEqual } from 'fbjs';

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

// definition
export default (
  viewer: useUpdateUserFragmentType | null,
): ((
  userInput: Pick<
    ValuesType,
    'userName' | 'userMobile' | 'userAddressAndZipCode' | 'userStreet'
  >,
) => Promise<void>) => {
  const [mutation] = useMutation<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >(updateUserAfterCreatingOrder);

  return useCallback(
    async ({ userName, userMobile, userAddressAndZipCode, userStreet }) => {
      const checkoutFields = viewer?.store?.setting?.checkoutFields;
      const input: updateUserAfterCreatingOrderVariables['input'] = [
        'name',
        'mobile',
        'address',
      ].reduce(
        (
          result,
          fieldName: keyof useUpdateUserFragmentStoreSettingCheckoutFields,
        ) => {
          if (checkoutFields?.[fieldName] === 'HIDDEN') return result;

          switch (fieldName) {
            case 'name': {
              if (!userName || userName === viewer?.name) return result;

              return {
                ...result,
                name: userName,
              };
            }

            case 'mobile': {
              if (!userMobile || userMobile === viewer?.mobile) return result;

              return {
                ...result,
                mobile: userMobile,
                additionalInfo: {
                  mobile: userMobile,
                },
              };
            }

            case 'address': {
              if (!userAddressAndZipCode) return result;

              const newAddress = {
                country: {
                  id: userAddressAndZipCode.address[0],
                },
                city: {
                  id: userAddressAndZipCode.address[1],
                },
                area: {
                  id: userAddressAndZipCode.address[2],
                },
                zipCode: userAddressAndZipCode.zipCode,
                street: userStreet,
              };

              if (areEqual(newAddress, viewer?.address)) return result;

              return {
                ...result,
                address: {
                  countryId: newAddress.country.id,
                  cityId: newAddress.city.id,
                  areaId: newAddress.area.id,
                  zipCode: newAddress.zipCode,
                  street: newAddress.street,
                },
              };
            }

            default:
              return result;
          }
        },
        {},
      );

      if (Object.keys(input).length === 0 || !checkoutFields) return;

      await mutation({
        variables: {
          input,
        },
        update: (
          cache: DataProxy,
          { data }: { data: updateUserAfterCreatingOrderType },
        ) => {
          if (data.updateShopperInformation.status !== 'OK' || !viewer?.id)
            return;

          const countryId = input.address?.countryId;
          const cityId = input.address?.cityId;
          const areaId = input.address?.areaId;

          cache.writeFragment<useUpdateUserFragmentType>({
            id: viewer.id,
            fragment: useUpdateUserFragment,
            data: {
              ...viewer,
              name:
                checkoutFields.name === 'HIDDEN'
                  ? viewer.name
                  : input.name || null,
              mobile:
                checkoutFields.mobile === 'HIDDEN'
                  ? viewer.mobile
                  : input.mobile || null,
              additionalInfo:
                checkoutFields.mobile === 'HIDDEN'
                  ? viewer.additionalInfo
                  : {
                      __typename: 'AdditionalInfoObjectType',
                      mobile: input.additionalInfo?.mobile || null,
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
                      street: input.address?.street || null,
                      zipCode: input.address?.zipCode || null,
                    },
            },
          });
        },
      });
    },
    [viewer, mutation],
  );
};
