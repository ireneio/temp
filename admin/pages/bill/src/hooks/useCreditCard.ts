// import
import { useState, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import useSetPaymentSetting from './useSetPaymentSetting';

// graphql typescript
import {
  payStoreBillWithTpPrime as payStoreBillWithTpPrimeType,
  payStoreBillWithTpPrimeVariables,
  payStoreBillWithTpCardId as payStoreBillWithTpCardIdType,
  payStoreBillWithTpCardIdVariables,
  paymentStoreBillingSettingFragment_payment_creditCard as paymentStoreBillingSettingFragmentPaymentCreditCard,
  StoreBillingPaymentMethodEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  payStoreBillWithTpPrime,
  payStoreBillWithTpCardId,
} from '../gqls/useCreditCard';

// definition
export default (
  billId: string,
  creditCard: paymentStoreBillingSettingFragmentPaymentCreditCard | null,
): {
  hasErrors: boolean;
  setPrime: (prime: string | null) => void;
  loading: boolean;
  payByPrime: () => void;
  success: { [key: string]: string } | null;
  payByCardId: () => void;
} => {
  const { t } = useTranslation('bill');
  const router = useRouter();
  const [prime, setPrime] = useState<string | null>('');
  const [success, setSuccess] = useState<{ [key: string]: string } | null>(
    null,
  );

  const setPaymentSetting = useSetPaymentSetting();

  const [
    payByPrime,
    { loading: payByPrimeLoading, client: payByPrimeClient },
  ] = useMutation<
    payStoreBillWithTpPrimeType,
    payStoreBillWithTpPrimeVariables
  >(payStoreBillWithTpPrime, {
    onCompleted: async data => {
      if (data.payStoreBillWithTpPrime?.status !== 'SUCCESS') {
        Modal.error({
          title: t('payment.fail'),
          content: t('payment.fail-description'),
          okText: t('payment.ok'),
        });
        return;
      }

      setSuccess({
        title: t('payment.success'),
        description: t('payment.go-back'),
      });

      setPaymentSetting({
        method: 'CREDIT_CARD' as StoreBillingPaymentMethodEnum,
        isRecurring: true,
      });

      if (payByPrimeClient) await payByPrimeClient.resetStore();

      router.push('/bill-payment');
    },
  });

  const [
    payByCardId,
    { loading: payByCardIdLoading, client: payByCardIdClient },
  ] = useMutation<
    payStoreBillWithTpCardIdType,
    payStoreBillWithTpCardIdVariables
  >(payStoreBillWithTpCardId, {
    onCompleted: async data => {
      if (data.payStoreBillWithTpCardId?.status !== 'SUCCESS') {
        Modal.error({
          title: t('payment.fail'),
          content: t('payment.fail-description'),
          okText: t('payment.ok'),
        });
        return;
      }

      setPaymentSetting({
        method: 'CREDIT_CARD' as StoreBillingPaymentMethodEnum,
        isRecurring: true,
      });

      if (payByCardIdClient) await payByCardIdClient.resetStore();

      router.push('/bill-payment');
    },
  });

  return {
    hasErrors: useMemo(() => prime === null, [prime]),
    setPrime,
    loading: payByPrimeLoading || payByCardIdLoading,
    payByPrime: useCallback(() => {
      if (prime && prime !== '')
        payByPrime({
          variables: {
            input: {
              billId,
              prime,
            },
          },
        });
      else setPrime(null);
    }, [billId, prime, payByPrime]),
    success,
    payByCardId: useCallback(() => {
      if (creditCard?.id)
        payByCardId({
          variables: {
            input: {
              billId,
              cardId: creditCard.id,
            },
          },
        });
    }, [billId, creditCard, payByCardId]),
  };
};
