// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  deleteRecipientAddress as deleteRecipientAddressType,
  deleteRecipientAddressVariables,
} from './__generated__/deleteRecipientAddress';
import { useDeleteRecipientAddressGetRecipientAddressBookCache as useDeleteRecipientAddressGetRecipientAddressBookCacheType } from './__generated__/useDeleteRecipientAddressGetRecipientAddressBookCache';
import { useDeleteRecipientAddressFragment } from './__generated__/useDeleteRecipientAddressFragment';

// definition
const mutation = gql`
  mutation deleteRecipientAddress($input: DeleteRecipientAddressInput!) {
    deleteRecipientAddress(input: $input) {
      status
    }
  }
`;

export default (): MutationFunction<
  deleteRecipientAddressType,
  deleteRecipientAddressVariables
> => {
  const { t } = useTranslation('member-recipients');
  const [deleteRecipientAddress] = useMutation<
    deleteRecipientAddressType,
    deleteRecipientAddressVariables
  >(mutation);

  return ({
    variables,
    ...options
  }: MutationHookOptions<
    deleteRecipientAddressType,
    deleteRecipientAddressVariables
  >) =>
    deleteRecipientAddress({
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

        const useDeleteRecipientAddressGetRecipientAddressBookCache = cache.readQuery<
          useDeleteRecipientAddressGetRecipientAddressBookCacheType
        >({
          query: gql`
            query useDeleteRecipientAddressGetRecipientAddressBookCache {
              viewer {
                id
                shippableRecipientAddresses {
                  id
                }
              }
            }
          `,
        });

        const id = variables?.input?.id;
        const { id: viewerId, shippableRecipientAddresses } =
          useDeleteRecipientAddressGetRecipientAddressBookCache?.viewer || {};

        if (!id || !viewerId || !shippableRecipientAddresses) return;

        cache.writeFragment<useDeleteRecipientAddressFragment>({
          id: viewerId,
          fragment: gql`
            fragment useDeleteRecipientAddressFragment on User {
              id
              shippableRecipientAddresses {
                id
              }
            }
          `,
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
