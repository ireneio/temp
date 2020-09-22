// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescrip
import { removeGmoCreditCard as removeGmoCreditCardType } from './__generated__/removeGmoCreditCard';
import { useRemoveGmoCreditCardReadCache } from './__generated__/useRemoveGmoCreditCardReadCache';
import { useRemoveGmoCreditCardUpdateCache } from './__generated__/useRemoveGmoCreditCardUpdateCache';

// definition
const mutation = gql`
  mutation removeGmoCreditCard {
    removeGmoCreditCard {
      status
    }
  }
`;

export default (): MutationTuple<removeGmoCreditCardType, unknown>[0] => {
  const { t } = useTranslation('member-settings');
  const [removeGmoCreditCard] = useMutation<removeGmoCreditCardType>(mutation, {
    update: (cache: DataProxy, { data }: { data: removeGmoCreditCardType }) => {
      if (data.removeGmoCreditCard.status !== 'SUCCESS') {
        notification.error({
          message: t('remove-credit-card-info.fail'),
        });
        return;
      }

      notification.success({
        message: t('remove-credit-card-info.success'),
      });

      const viewerCache = cache.readQuery<useRemoveGmoCreditCardReadCache>({
        query: gql`
          query useRemoveGmoCreditCardReadCache {
            viewer {
              id
            }
          }
        `,
      });
      const id = viewerCache?.viewer?.id;

      if (!id) return;

      cache.writeFragment<useRemoveGmoCreditCardUpdateCache>({
        id,
        fragment: gql`
          fragment useRemoveGmoCreditCardUpdateCache on User {
            id
            hasGmoCreditCard
          }
        `,
        data: {
          __typename: 'User',
          id,
          hasGmoCreditCard: false,
        },
      });
    },
  });

  return removeGmoCreditCard;
};
