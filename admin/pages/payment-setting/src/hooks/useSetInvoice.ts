// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  setStoreBillingEmailSetting as setStoreBillingEmailSettingType,
  setStoreBillingEmailSettingVariables,
  useSetInvoiceEmailStoreFragment as useSetInvoiceEmailStoreFragmentType,
  setStoreBillingInvoiceSetting as setStoreBillingInvoiceSettingType,
  setStoreBillingInvoiceSettingVariables,
  useSetInvoiceStoreFragment as useSetInvoiceStoreFragmentType,
  useSetInvoiceStoreFragment_setting_billing_invoice as useSetInvoiceStoreFragmentSettingBillingInvoice,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  setStoreBillingEmailSetting,
  setStoreBillingInvoiceSetting,
  useSetInvoiceEmailStoreFragment,
  useSetInvoiceStoreFragment,
} from '../gqls/useSetInvoice';

// definition
export default (): {
  loading: boolean;
  setStoreBillingEmailSetting: (
    storeId: string,
    input: setStoreBillingEmailSettingVariables['input'],
  ) => Promise<void>;
  setStoreBillingInvoiceSetting: (
    storeId: string,
    input: setStoreBillingInvoiceSettingVariables['input'],
  ) => Promise<void>;
} => {
  const [setBillingEmail, { loading: setBillingEmailLoading }] = useMutation<
    setStoreBillingEmailSettingType,
    setStoreBillingEmailSettingVariables
  >(setStoreBillingEmailSetting);

  const [
    setBillingInvoice,
    { loading: setBillingInvoiceLoading },
  ] = useMutation<
    setStoreBillingInvoiceSettingType,
    setStoreBillingInvoiceSettingVariables
  >(setStoreBillingInvoiceSetting);

  return {
    loading: setBillingEmailLoading || setBillingInvoiceLoading,
    setStoreBillingEmailSetting: useCallback(
      async (storeId, input: setStoreBillingEmailSettingVariables['input']) =>
        new Promise((resolve, reject) =>
          setBillingEmail({
            variables: {
              input,
            },
            update: (
              cache: DataProxy,
              { data }: { data: setStoreBillingEmailSettingType },
            ) => {
              if (data.setStoreBillingEmailSetting.status !== 'OK') {
                reject(new Error(data.setStoreBillingEmailSetting.status));
                return;
              }

              cache.writeFragment<useSetInvoiceEmailStoreFragmentType>({
                id: storeId,
                fragment: useSetInvoiceEmailStoreFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  setting: {
                    __typename: 'SettingObjectType',
                    billing: {
                      __typename: 'StoreBillingSetting',
                      invoice: {
                        __typename: 'StoreBillingInvoiceSetting',
                        email: input.email,
                      },
                    },
                  },
                },
              });

              resolve();
            },
          }),
        ),
      [setBillingEmail],
    ),
    setStoreBillingInvoiceSetting: useCallback(
      async (storeId, input: setStoreBillingInvoiceSettingVariables['input']) =>
        new Promise((resolve, reject) =>
          setBillingInvoice({
            variables: {
              input,
            },
            update: (
              cache: DataProxy,
              { data }: { data: setStoreBillingInvoiceSettingType },
            ) => {
              if (
                data.setStoreBillingInvoiceSetting.status !== 'OK' ||
                !data.setStoreBillingInvoiceSetting.billingSetting
              ) {
                reject(new Error(data.setStoreBillingInvoiceSetting.status));
                return;
              }

              cache.writeFragment<useSetInvoiceStoreFragmentType>({
                id: storeId,
                fragment: useSetInvoiceStoreFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  setting: {
                    __typename: 'SettingObjectType',
                    billing: {
                      __typename: 'StoreBillingSetting',
                      invoice: {
                        ...(data.setStoreBillingInvoiceSetting.billingSetting
                          .invoice as useSetInvoiceStoreFragmentSettingBillingInvoice),
                      },
                    },
                  },
                },
              });

              resolve();
            },
          }),
        ),
      [setBillingInvoice],
    ),
  };
};
