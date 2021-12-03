// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  deleteRecipientAddress as deleteRecipientAddressType,
  deleteRecipientAddressVariables as deleteRecipientAddressVariablesType,
  useDeleteRecipientAddressGetCache as useDeleteRecipientAddressGetCacheType,
  useDeleteRecipientAddressFragment as useDeleteRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  deleteRecipientAddress,
  useDeleteRecipientAddressGetCache,
  useDeleteRecipientAddressFragment,
} from '../gqls/useDeleteRecipientAddress';

// definition
export default (): ((id: string) => void) => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    deleteRecipientAddressType,
    deleteRecipientAddressVariablesType
  >(deleteRecipientAddress);

  return useCallback(
    (id: string) => {
      mutation({
        variables: { input: { id } },
        update: (
          cache: DataProxy,
          { data }: { data: deleteRecipientAddressType },
        ) => {
          if (data.deleteRecipientAddress.status !== 'OK') {
            notification.error({
              message: t('mutation.failure'),
            });
            return;
          }

          const useDeleteRecipientAddressCache = cache.readQuery<
            useDeleteRecipientAddressGetCacheType
          >({
            query: useDeleteRecipientAddressGetCache,
          });
          const { id: viewerId, shippableRecipientAddresses } =
            useDeleteRecipientAddressCache?.viewer || {};

          if (!id || !viewerId || !shippableRecipientAddresses) return;

          cache.writeFragment<useDeleteRecipientAddressFragmentType>({
            id: viewerId,
            fragment: useDeleteRecipientAddressFragment,
            data: {
              __typename: 'User',
              id: viewerId,
              shippableRecipientAddresses: shippableRecipientAddresses.filter(
                ({ id: shippableRecipientAddressesId }) =>
                  id !== shippableRecipientAddressesId,
              ),
            },
          });

          notification.success({ message: t('mutation.success') });
        },
      });
    },
    [t, mutation],
  );
};
