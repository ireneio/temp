// import
import { useEffect, useState, useCallback, useRef } from 'react';
import { notification } from 'antd';
import getConfig from 'next/config';
import { emptyFunction } from 'fbjs';

// typescript definition
interface PropsType {
  token: string;
  isNeedDefaultLoading?: boolean;
  language?: 'zhTW' | 'enUS';
}

// definition
const {
  publicRuntimeConfig: { ENV },
} = getConfig();

export default ({
  token,
  isNeedDefaultLoading,
  language,
}: PropsType): {
  ecpayLoading: boolean;
  getPaymentInfo: () => Promise<
    { payToken: string; paymentType: string } | undefined
  >;
} => {
  const [countdown, setCountdown] = useState(10);
  const [ecpayLoading, setEcpayLoading] = useState<boolean>(true);
  const [ecpay, setEcpay] = useState<typeof window['ECPay']>();
  const setEcpayTimeout = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );
  const timeout = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );
  const jqueryRef = useRef(
    typeof window === 'undefined' ? null : document.createElement('script'),
  );
  const forgeRef = useRef(
    typeof window === 'undefined' ? null : document.createElement('script'),
  );
  const ecpayRef = useRef(
    typeof window === 'undefined' ? null : document.createElement('script'),
  );

  useEffect(() => {
    const dom = document.getElementById('meepshop');
    const jqueryDom = jqueryRef.current;
    const forgeDom = forgeRef.current;
    const ecpayDom = ecpayRef.current;

    if (jqueryDom)
      jqueryDom.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
    if (forgeDom)
      forgeDom.src =
        'https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js';
    if (ecpayDom)
      ecpayDom.src = `https://${
        ENV === 'production' ? 'ecpg' : 'ecpg-stage'
      }.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116`;

    if (dom && jqueryDom) dom.appendChild(jqueryDom);
    if (dom && forgeDom) dom.appendChild(forgeDom);

    clearTimeout(timeout.current);

    if (dom && ecpayDom)
      timeout.current = setTimeout(() => {
        dom.appendChild(ecpayDom);
      }, 500);

    return () => {
      if (jqueryDom) jqueryDom.remove();
      if (forgeDom) forgeDom.remove();
      if (ecpayDom) ecpayDom.remove();

      clearTimeout(timeout.current);
    };
  }, [jqueryRef, forgeRef, ecpayRef, timeout]);

  useEffect(() => {
    clearTimeout(setEcpayTimeout.current);

    if (!ecpay && countdown !== 0)
      setEcpayTimeout.current = setTimeout(() => {
        setEcpay(window.ECPay);
        setCountdown(countdown - 1);
      }, 800);

    if (!ecpay && countdown === 0)
      notification.error({
        message: 'ECPay Error',
        description: 'ecpay sdk not found',
      });

    return () => clearTimeout(setEcpayTimeout.current);
  }, [ecpay, countdown]);

  useEffect(() => {
    if (ecpay && token)
      ecpay.initialize(
        ecpay.ServerType[ENV === 'production' ? 'Prod' : 'Stage'],
        isNeedDefaultLoading ? 1 : 0,
        initializeError => {
          if (!initializeError) {
            ecpay.createPayment(
              token,
              ecpay.Language[language || 'zhTW'],
              createPaymentError => {
                setEcpayLoading(false);

                if (createPaymentError)
                  notification.error({
                    message: 'ECPay CreatePayment Error',
                    description: createPaymentError,
                  });
              },
            );
          } else {
            notification.error({
              message: 'ECPay Initialize Error',
              description: initializeError,
            });
          }
        },
      );
  }, [ecpay, token, isNeedDefaultLoading, language]);

  return {
    ecpayLoading,
    getPaymentInfo: useCallback(
      async () =>
        new Promise(resolve => {
          if (ecpay)
            ecpay.getPayToken((paymentInfo, error) => {
              if (error) {
                notification.error({
                  message: 'ECPay GetPayToken Error',
                  description: error,
                });

                resolve();
              } else if (paymentInfo) {
                const { PayToken, PaymentType } = paymentInfo;

                resolve({ payToken: PayToken, paymentType: PaymentType });
              }
            });
          else resolve();
        }),
      [ecpay],
    ),
  };
};
