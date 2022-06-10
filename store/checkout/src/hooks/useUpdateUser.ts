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
    'viewerName' | 'viewerMobile' | 'viewerAddressAndZipCode' | 'viewerStreet'
  >,
) => Promise<void>) => {
  const [mutation] = useMutation<
    updateUserAfterCreatingOrderType,
    updateUserAfterCreatingOrderVariables
  >(updateUserAfterCreatingOrder);

  return useCallback(
    async ({
      viewerName,
      viewerMobile,
      viewerAddressAndZipCode,
      viewerStreet,
    }) => {
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
              if (!viewerName || viewerName === viewer?.name) return result;

              return {
                ...result,
                name: viewerName,
              };
            }

            case 'mobile': {
              if (!viewerMobile || viewerMobile === viewer?.mobile)
                return result;

              return {
                ...result,
                mobile: viewerMobile,
              };
            }

            case 'address': {
              if (!viewerAddressAndZipCode) return result;

              const newAddress = {
                country: {
                  id: viewerAddressAndZipCode.address[0],
                },
                city: {
                  id: viewerAddressAndZipCode.address[1],
                },
                area: {
                  id: viewerAddressAndZipCode.address[2],
                },
                zipCode: viewerAddressAndZipCode.zipCode,
                street: viewerStreet,
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
