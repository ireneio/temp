// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  removeStoreBillingPaymentCreditCardSetting as removeStoreBillingPaymentCreditCardSettingType,
  removeStoreBillingPaymentCreditCardSettingVariables,
  useSetCreditCardStoreFragment as useSetCreditCardStoreFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  removeStoreBillingPaymentCreditCardSetting,
  useSetCreditCardStoreFragment,
} from '../gqls/useSetCreditCard';

// definition
export default (
  storeId: string | null,
): {
  removeCreditCard: (cardId: string | null) => void;
} => {
  const { t } = useTranslation('payment-setting');

  const [mutation] = useMutation<
    removeStoreBillingPaymentCreditCardSettingType,
    removeStoreBillingPaymentCreditCardSettingVariables
  >(removeStoreBillingPaymentCreditCardSetting, {
    update: (cache, { data }) => {
      if (!storeId) return;

      const status = data?.removeStoreBillingPaymentCreditCardSetting?.status;

      switch (status) {
        case 'OK':
          cache.writeFragment<useSetCreditCardStoreFragmentType>({
            id: storeId,
            fragment: useSetCreditCardStoreFragment,
            data: {
              __typename: 'Store',
              id: storeId,
              setting: {
                __typename: 'SettingObjectType',
                billing: {
                  __typename: 'StoreBillingSetting',
                  payment: {
                    __typename: 'StoreBillingPaymentSetting',
                    creditCard: null,
                  },
                },
              },
            },
          });

          message.success(t('success'));
          break;

        default:
          message.error(
            `${t('error')}：${
              data?.removeStoreBillingPaymentCreditCardSetting?.status
            }`,
          );
          break;
      }
    },
  });

  return {
    removeCreditCard: useCallback(
      cardId => {
        if (cardId && storeId)
          mutation({
            variables: { input: { cardId } },
          });
      },
      [mutation, storeId],
    ),
  };
};
