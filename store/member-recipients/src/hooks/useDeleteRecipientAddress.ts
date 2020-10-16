// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  deleteRecipientAddress as deleteRecipientAddressType,
  deleteRecipientAddressVariables,
} from '../gqls/__generated__/deleteRecipientAddress';
import { useDeleteRecipientAddressGetCache as useDeleteRecipientAddressGetCacheType } from '../gqls/__generated__/useDeleteRecipientAddressGetCache';
import { useDeleteRecipientAddressFragment as useDeleteRecipientAddressFragmentType } from '../gqls/__generated__/useDeleteRecipientAddressFragment';

// graphql import
import {
  deleteRecipientAddress,
  useDeleteRecipientAddressGetCache,
  useDeleteRecipientAddressFragment,
} from '../gqls/useDeleteRecipientAddress';

// definition
export default (): MutationFunction<
  deleteRecipientAddressType,
  deleteRecipientAddressVariables
> => {
  const { t } = useTranslation('member-recipients');
  const [mutation] = useMutation<
    deleteRecipientAddressType,
    deleteRecipientAddressVariables
  >(deleteRecipientAddress);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    deleteRecipientAddressType,
    deleteRecipientAddressVariables
  >) =>
    mutation({
      ...options,
      variables,
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

        const id = variables?.input?.id;
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
};
