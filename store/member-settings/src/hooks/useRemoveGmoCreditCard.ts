// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  removeGmoCreditCard as removeGmoCreditCardType,
  useRemoveGmoCreditCardFragment as useRemoveGmoCreditCardFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  removeGmoCreditCard,
  useRemoveGmoCreditCardFragment,
} from '../gqls/useRemoveGmoCreditCard';

// definition
export default (
  id: string | null,
): MutationTuple<removeGmoCreditCardType, unknown>[0] => {
  const { t } = useTranslation('member-settings');
  const [mutation] = useMutation<removeGmoCreditCardType>(removeGmoCreditCard, {
    update: (cache: DataProxy, { data }) => {
      if (data?.removeGmoCreditCard.status !== 'SUCCESS') {
        notification.error({
          message: t('remove-credit-card-info.fail'),
        });
        return;
      }

      notification.success({
        message: t('remove-credit-card-info.success'),
      });

      if (!id) return;

      cache.writeFragment<useRemoveGmoCreditCardFragmentType>({
        id,
        fragment: useRemoveGmoCreditCardFragment,
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
