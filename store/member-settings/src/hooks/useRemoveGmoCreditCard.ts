// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  removeGmoCreditCard as removeGmoCreditCardType,
  useRemoveGmoCreditCardUpdateCache as useRemoveGmoCreditCardUpdateCacheType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  removeGmoCreditCard,
  useRemoveGmoCreditCardUpdateCache,
} from '../gqls/useRemoveGmoCreditCard';

// definition
export default (
  id: string | null,
): MutationTuple<removeGmoCreditCardType, unknown>[0] => {
  const { t } = useTranslation('member-settings');
  const [mutation] = useMutation<removeGmoCreditCardType>(removeGmoCreditCard, {
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

      if (!id) return;

      cache.writeFragment<useRemoveGmoCreditCardUpdateCacheType>({
        id,
        fragment: useRemoveGmoCreditCardUpdateCache,
        data: {
          __typename: 'User',
          id,
          hasGmoCreditCard: false,
        },
      });
    },
  });

  return mutation;
};
