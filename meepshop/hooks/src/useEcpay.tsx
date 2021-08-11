// import
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { notification } from 'antd';
import getConfig from 'next/config';
import { emptyFunction } from 'fbjs';

// typescript definition
interface PropsType {
  token: string;
  isNeedDefaultLoading?: boolean;
  language?: 'zhTW' | 'enUS';
  setInitialized?: (initialized: boolean) => void;
}

// definition
const {
  publicRuntimeConfig: { ENV },
} = getConfig();

export default ({
  token,
  isNeedDefaultLoading,
  language,
  setInitialized,
}: PropsType): {
  ecpayScript: React.ReactNode;
  getPaymentInfo: () => Promise<
    { payToken: string; paymentType: string } | undefined
  >;
} => {
  const [countdown, setCountdown] = useState(5);
  const [ecpay, setEcpay] = useState<typeof window['ECPay']>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (!ecpay && countdown !== 0)
      timeoutRef.current = setTimeout(() => {
        setEcpay(window.ECPay);
        setCountdown(countdown - 1);
      }, 200);

    if (!ecpay && countdown === 0)
      notification.error({
        message: 'ECPay Error',
        description: 'ecpay sdk not found',
      });

    return () => clearTimeout(timeoutRef.current);
  }, [ecpay, countdown]);

  useEffect(() => {
    if (ecpay)
      ecpay.initialize(
        ecpay.ServerType[ENV === 'production' ? 'Prod' : 'Stage'],
        isNeedDefaultLoading ? 1 : 0,
        initializeError => {
          if (!initializeError) {
            ecpay.createPayment(
              token,
              ecpay.Language[language || 'zhTW'],
              createPaymentError => {
                if (setInitialized) setInitialized(true);

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
  }, [ecpay, token, isNeedDefaultLoading, language, setInitialized]);

  return {
    ecpayScript: (
      <>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js" />
        <script src="https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116" />
      </>
    ),
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
