// typescript import
import { ValuesType } from './useInitialValues';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';

import useSetInvoice from './useSetInvoice';
import useSetPayment from './useSetPayment';

// graphql typescript
import {
  StoreBillingInvoiceSettingAccountTypeEnum,
  StoreBillingPaymentMethodEnum,
  paymentFragment,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  initialValues: ValuesType | undefined,
  store: paymentFragment | null,
): {
  loading: boolean;
  save: (values: ValuesType) => void;
} => {
  const { t } = useTranslation('payment-setting');
  const {
    loading: setInvoiceLoading,
    setStoreBillingEmailSetting,
    setStoreBillingInvoiceSetting,
  } = useSetInvoice();
  const { loading: setPaymentLoading, setPayment } = useSetPayment(store);

  return {
    loading: setInvoiceLoading || setPaymentLoading,
    save: useCallback(
      async ({ invoice, payment = { method: null } }) => {
        const { invoice: initialInvoice, payment: initialPayment } =
          initialValues || {};

        const storeId = store?.id;
        const accountType = store?.setting?.billing?.billingType;

        if (!storeId) return;

        try {
          const mutations = [];

          if (!areEqual(initialInvoice, invoice)) {
            if (accountType === 'CONTRACT')
              mutations.push(
                setStoreBillingEmailSetting(storeId, {
                  email: invoice.email || '',
                }),
              );
            else
              mutations.push(
                setStoreBillingInvoiceSetting(storeId, {
                  address: '',
                  zipcode: '',
                  accountType: invoice.accountType as StoreBillingInvoiceSettingAccountTypeEnum,
                  name: invoice.name || '',
                  email: invoice.email || '',
                  title: invoice.title,
                  ban: invoice.ban,
                  addressV2: {
                    countryId: invoice.addressV2.address[0],
                    cityId: invoice.addressV2.address[1],
                    areaId: invoice.addressV2.address[2],
                    street: invoice.street,
                    zipCode: invoice.addressV2.zipCode,
                  },
                }),
              );
          }

          if (!areEqual(initialPayment, payment)) {
            mutations.push(
              setPayment(storeId, {
                method: payment.method as StoreBillingPaymentMethodEnum,
                isRecurring: payment.method === 'CREDIT_CARD',
              }),
            );
          }

          await Promise.all(mutations);
          message.success(t('success'));
        } catch (error) {
          message.error(`${t('error')}：${error.message}`);
        }
      },
      [
        t,
        initialValues,
        store,
        setStoreBillingEmailSetting,
        setStoreBillingInvoiceSetting,
        setPayment,
      ],
    ),
  };
};
