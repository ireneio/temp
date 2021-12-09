// import
import { useMemo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useEcpay } from '@meepshop/hooks';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment as ecPay2CreatePaymentType,
  ecPay2CreatePaymentVariables,
  ecPay2CreatePayment_ecPay2CreatePayment as ecPay2CreatePaymentEcPay2CreatePayment,
} from '@meepshop/types/gqls/store';

// graphql import
import { ecPay2CreatePayment } from '../gqls/usePayment';

// definition
export default (
  token: string,
  viewer: paymentFragmentType | null,
  setPaymentInfo: (paymentInfo: ecPay2CreatePaymentEcPay2CreatePayment) => void,
): {
  ecpayScript: JSX.Element | null;
  ecpayLoading: boolean;
  isCreditPayment: boolean;
  loading: boolean;
  isRedirecting: boolean;
  ecPay2CreatePayment: () => void;
} => {
  const { i18n } = useTranslation('ecpay');
  const { query, push, pathname } = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { ecpayScript, ecpayLoading, getPaymentInfo } = useEcpay({
    token,
    isNeedDefaultLoading: true,
    language: i18n.language === 'zh_TW' ? 'zhTW' : 'enUS',
  });

  const [mutation, { loading }] = useMutation<
    ecPay2CreatePaymentType,
    ecPay2CreatePaymentVariables
  >(ecPay2CreatePayment, {
    onCompleted: data => {
      if (!viewer?.order?.id || !data) return;

      switch (data.ecPay2CreatePayment.__typename) {
        case 'ECPay2CreatePaymentRedirect':
          setIsRedirecting(true);
          window.location.href = data.ecPay2CreatePayment.url || '';
          break;

        case 'OrderPaymentCredit':
          // FIXME: landing-page issue
          push(`
          ${
            /^\/landing-page/.test(pathname) ? '/landing-page' : '/checkout'
          }/thank-you-page/${viewer.order.id}${
            query.redirectUrl ? `?redirectUrl=${query.redirectUrl}` : ''
          }`);
          break;

        case 'OrderPaymentAtm':
        case 'OrderPaymentCVSPayCode':
        case 'OrderPaymentBarcode':
          setPaymentInfo(data.ecPay2CreatePayment);
          break;

        case 'ECPay2CreatePaymentError':
          // FIXME: landing-page issue
          push(`
          ${
            /^\/landing-page/.test(pathname) ? '/landing-page' : '/checkout'
          }/thank-you-page/${viewer.order.id}?error=${
            data.ecPay2CreatePayment.code
          }&message=${data.ecPay2CreatePayment.message}${
            query.redirectUrl ? `&redirectUrl=${query.redirectUrl}` : ''
          }`);
          break;

        case 'UnhandledECPay2CreatePaymentError':
          // FIXME: landing-page issue
          push(`
          ${
            /^\/landing-page/.test(pathname) ? '/landing-page' : '/checkout'
          }/thank-you-page/${viewer.order.id}?error=${
            data.ecPay2CreatePayment.__typename
          }&message=${data.ecPay2CreatePayment.error}${
            query.redirectUrl ? `&redirectUrl=${query.redirectUrl}` : ''
          }`);
          break;

        default:
          notification.error({ message: data.ecPay2CreatePayment });
          break;
      }
    },
  });

  return {
    ecpayScript,
    ecpayLoading,
    isCreditPayment: useMemo(
      () =>
        /CREDIT/.test(
          viewer?.order?.paymentInfo?.list?.[0]?.accountInfo?.ecpay2
            ?.ChoosePayment || '',
        ),
      [viewer],
    ),
    loading,
    isRedirecting,
    ecPay2CreatePayment: useCallback(async () => {
      const paymentInfo = await getPaymentInfo();
      const { payToken } = paymentInfo || {};

      if (viewer?.order?.id && payToken)
        mutation({
          variables: { input: { orderId: viewer.order.id, payToken } },
        });
    }, [mutation, getPaymentInfo, viewer]),
  };
};
