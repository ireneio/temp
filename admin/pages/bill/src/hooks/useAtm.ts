// import
import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useEcpay } from '@meepshop/hooks';

// graphql typescript
import {
  createEcpayAtmToken as createEcpayAtmTokenType,
  createEcpayAtmTokenVariables,
  createECPayATMPayment as createECPayATMPaymentType,
  createECPayATMPaymentVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { createEcpayAtmToken, createECPayATMPayment } from '../gqls/useAtm';

// definition
export default (
  billId: string,
  onCancel: () => void,
): {
  ecpayLoading: boolean;
  loading: boolean;
  createECPayATMPayment: () => void;
} => {
  const { t } = useTranslation('bill');
  const [token, setToken] = useState<string>('');
  const [billPaymentId, setBillPaymentId] = useState<string | null>();
  const { ecpayLoading, getPaymentInfo } = useEcpay({ token });

  const [getEcpayAtmToken] = useMutation<
    createEcpayAtmTokenType,
    createEcpayAtmTokenVariables
  >(createEcpayAtmToken, {
    onCompleted: data => {
      if (data.createEcpayAtmToken.status !== 'SUCCESS') {
        Modal.error({
          title: t('payment.atm-fail'),
          content: t('payment.atm-fail-description'),
          okText: t('payment.ok'),
        });
        return;
      }

      setToken(data?.createEcpayAtmToken?.token || '');
      setBillPaymentId(data?.createEcpayAtmToken?.billPaymentId || null);
    },
  });

  const [getAtmAccount, { loading, client }] = useMutation<
    createECPayATMPaymentType,
    createECPayATMPaymentVariables
  >(createECPayATMPayment, {
    onCompleted: async data => {
      if (data.createECPayATMPayment.status !== 'SUCCESS') {
        Modal.error({
          title: t('payment.atm-fail'),
          content: t('payment.atm-fail-description'),
          okText: t('payment.ok'),
        });
        return;
      }

      if (client) await client.resetStore();

      onCancel();
    },
  });

  useEffect(() => {
    if (!token)
      getEcpayAtmToken({
        variables: {
          input: {
            billId,
          },
        },
      });
  }, [getEcpayAtmToken, billId, token]);

  return {
    ecpayLoading,
    loading,
    createECPayATMPayment: useCallback(async () => {
      const paymentInfo = await getPaymentInfo();
      const { payToken } = paymentInfo || {};

      if (billPaymentId && payToken)
        getAtmAccount({
          variables: {
            input: {
              billId,
              billPaymentId,
              payToken,
            },
          },
        });
    }, [getPaymentInfo, getAtmAccount, billId, billPaymentId]),
  };
};
