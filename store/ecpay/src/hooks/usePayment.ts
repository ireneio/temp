// import
import { useMemo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useEcpay } from '@meepshop/hooks';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  paymentFragment as paymentFragmentType,
  ecPay2CreatePayment as ecPay2CreatePaymentType,
  ecPay2CreatePaymentVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import { ecPay2CreatePayment } from '../gqls/usePayment';

// definition
export default (
  viewer: paymentFragmentType | null,
): {
  isCreditPayment: boolean;
  ecpayScript: React.ReactNode;
  ecPay2CreatePayment: () => void;
} => {
  const { i18n } = useTranslation('ecpay');
  const { query } = useRouter();

  const { ecpayScript, getPaymentInfo } = useEcpay({
    token: query.token as string,
    isNeedDefaultLoading: true,
    language: i18n.language === 'zh_TW' ? 'zhTW' : 'enUS',
  });

  const [mutation] = useMutation<
    ecPay2CreatePaymentType,
    ecPay2CreatePaymentVariables
  >(ecPay2CreatePayment);

  return {
    isCreditPayment: useMemo(
      () =>
        /CREDIT/.test(
          viewer?.order?.paymentInfo?.list?.[0]?.accountInfo?.ecpay2
            ?.ChoosePayment || '',
        ),
      [viewer],
    ),
    ecpayScript,
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
