// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  setStoreBillingPaymentSetting as setStoreBillingPaymentSettingType,
  setStoreBillingPaymentSettingVariables,
  useSetPaymentStoreFragment as useSetPaymentStoreFragmentType,
  paymentFragment,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  setStoreBillingPaymentSetting,
  useSetPaymentStoreFragment,
} from '../gqls/useSetPayment';

// definition
export default (
  store: paymentFragment | null,
): {
  loading: boolean;
  setPayment: (
    storeId: string,
    input: setStoreBillingPaymentSettingVariables['input'],
  ) => Promise<void>;
} => {
  const [mutation, { loading }] = useMutation<
    setStoreBillingPaymentSettingType,
    setStoreBillingPaymentSettingVariables
  >(setStoreBillingPaymentSetting);

  return {
    loading,
    setPayment: useCallback(
      async (storeId, input: setStoreBillingPaymentSettingVariables['input']) =>
        new Promise((resolve, reject) =>
          mutation({
            variables: {
              input,
            },
            update: (
              cache: DataProxy,
              { data }: { data: setStoreBillingPaymentSettingType },
            ) => {
              if (data.setStoreBillingPaymentSetting.status !== 'OK') {
                reject(new Error(data.setStoreBillingPaymentSetting.status));
                return;
              }

              cache.writeFragment<useSetPaymentStoreFragmentType>({
                id: storeId,
                fragment: useSetPaymentStoreFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  setting: {
                    __typename: 'SettingObjectType',
                    billing: {
                      __typename: 'StoreBillingSetting',
                      payment: {
                        __typename: 'StoreBillingPaymentSetting',
                        ...(store?.setting?.billing?.payment?.creditCard
                          ? {
                              creditCard: {
                                __typename: 'StoreBillPaymentCreditCardSetting',
                                id:
                                  store?.setting?.billing?.payment?.creditCard
                                    ?.id || null,
                                lastFourDigit:
                                  store?.setting?.billing?.payment?.creditCard
                                    ?.lastFourDigit || null,
                              },
                            }
                          : {
                              creditCard: null,
                            }),
                        ...input,
                      },
                    },
                  },
                },
              });

              resolve();
            },
          }),
        ),
      [store, mutation],
    ),
  };
};
