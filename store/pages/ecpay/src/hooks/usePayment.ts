// import
import { useMemo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
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
  viewer: paymentFragmentType | null,
  setPaymentInfo: (paymentInfo: ecPay2CreatePaymentEcPay2CreatePayment) => void,
): {
  ecpayLoading: boolean;
  isCreditPayment: boolean;
  loading: boolean;
  ecPay2CreatePayment: () => void;
} => {
  const { i18n } = useTranslation('ecpay');
  const { query, push } = useRouter();

  const { ecpayLoading, getPaymentInfo } = useEcpay({
    token: query.token as string,
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
          window.location.href = data.ecPay2CreatePayment.url || '';
          break;

        case 'OrderPaymentCredit':
          push(`/checkout/thank-you-page/${viewer.order.id}`);
          break;

        case 'OrderPaymentAtm':
        case 'OrderPaymentCVSPayCode':
        case 'OrderPaymentBarcode':
          setPaymentInfo(data.ecPay2CreatePayment);
          break;

        case 'ECPay2CreatePaymentError':
          push(
            `/checkout/thank-you-page/${viewer.order.id}?error=${data.ecPay2CreatePayment.code}&message=${data.ecPay2CreatePayment.message}`,
          );
          break;

        case 'UnhandledECPay2CreatePaymentError':
          push(
            `/checkout/thank-you-page/${viewer.order.id}?error=${data.ecPay2CreatePayment.__typename}&message=${data.ecPay2CreatePayment.error}`,
          );
          break;

        default:
          notification.error({ message: data.ecPay2CreatePayment });
          break;
      }
    },
  });

  return {
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
