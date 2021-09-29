// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  addRecipientAddress as addRecipientAddressType,
  addRecipientAddressVariables as addRecipientAddressVariablesType,
  useAddRecipientAddressGetCache as useAddRecipientAddressGetCacheType,
  useAddRecipientAddressFragment as useAddRecipientAddressFragmentType,
  useAddRecipientAddressFragment_shippableRecipientAddresses as useAddRecipientAddressFragmentShippableRecipientAddresses,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  addRecipientAddress,
  useAddRecipientAddressGetCache,
  useAddRecipientAddressFragment,
} from '../gqls/useAddRecipientAddress';

// definition
export default (): MutationFunction<
  addRecipientAddressType,
  addRecipientAddressVariablesType
> => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    addRecipientAddressType,
    addRecipientAddressVariablesType
  >(addRecipientAddress);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    addRecipientAddressType,
    addRecipientAddressVariablesType
  >) =>
    mutation({
      ...options,
      variables,
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
        const useAddRecipientAddressCache = cache.readQuery<
          useAddRecipientAddressGetCacheType
        >({
          query: useAddRecipientAddressGetCache,
        });

        const input = variables?.input;
        const { id: viewerId, shippableRecipientAddresses } =
          useAddRecipientAddressCache?.viewer || {};

        if (!input || !viewerId || !shippableRecipientAddresses) return;

        const { countryId, cityId, areaId, ...newRecipientAddress } = input;

        cache.writeFragment<useAddRecipientAddressFragmentType>({
          id: viewerId,
          fragment: useAddRecipientAddressFragment,
          data: {
            __typename: 'User',
            id: viewerId,
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
};
