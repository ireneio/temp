// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  addRecipientAddress as addRecipientAddressType,
  addRecipientAddressVariables as addRecipientAddressVariablesType,
  useAddRecipientAddressFragment as useAddRecipientAddressFragmentType,
  useAddRecipientAddressFragment_shippableRecipientAddresses as useAddRecipientAddressFragmentShippableRecipientAddresses,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  addRecipientAddress,
  useAddRecipientAddressFragment,
} from '../gqls/useAddRecipientAddress';

// definition
export default (
  viewer: useAddRecipientAddressFragmentType,
): ((input: addRecipientAddressVariablesType['input']) => Promise<void>) => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    addRecipientAddressType,
    addRecipientAddressVariablesType
  >(addRecipientAddress);

  return useCallback(
    async (input: addRecipientAddressVariablesType['input']) => {
      await mutation({
        variables: { input },
        update: (
          cache: DataProxy,
          { data }: { data: addRecipientAddressType },
        ) => {
          if (data.addRecipientAddress.status !== 'OK') {
            notification.error({
              message: t('mutation.failure'),
            });
            return;
          }

          const { recipientAddressId } = data.addRecipientAddress;

          const { id, shippableRecipientAddresses } = viewer;

          if (!id || !shippableRecipientAddresses) return;

          const { countryId, cityId, areaId, ...newRecipientAddress } = input;

          cache.writeFragment<useAddRecipientAddressFragmentType>({
            id,
            fragment: useAddRecipientAddressFragment,
            data: {
              __typename: 'User',
              id,
              shippableRecipientAddresses: !recipientAddressId
                ? shippableRecipientAddresses
                : [
                    ...shippableRecipientAddresses,
                    {
                      ...(newRecipientAddress as useAddRecipientAddressFragmentShippableRecipientAddresses),
                      __typename: 'RecipientAddress',
                      id: recipientAddressId,
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
                    },
                  ],
            },
          });

          notification.success({ message: t('mutation.success') });
        },
      });
    },
    [mutation, viewer, t],
  );
};
