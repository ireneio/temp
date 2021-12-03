// import
import { useEffect, useState, useCallback, useRef } from 'react';
import getConfig from 'next/config';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  log as logType,
  logVariables,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

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
  const [mutation] = useMutation<logType, logVariables>(log);

  useEffect(() => {
    clearTimeout(setEcpayTimeout.current);

    if (!ecpay && countdown !== 0)
      setEcpayTimeout.current = setTimeout(() => {
        if (window.ECP) setEcpay(new window.ECP());
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

                mutation({
                  variables: {
                    input: {
                      type: 'INFO' as LogTypeEnum,
                      name: 'ECPAY_INIT' as LogNameEnum,
                      data: {},
                    },
                  },
                });

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
  }, [ecpay, token, isNeedDefaultLoading, language, mutation]);

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

                mutation({
                  variables: {
                    input: {
                      type: 'INFO' as LogTypeEnum,
                      name: 'ECPAY_GET_PAY_TOKEN' as LogNameEnum,
                      data: {},
                    },
                  },
                });

                resolve({ payToken: PayToken, paymentType: PaymentType });
              }
            });
          else resolve();
        }),
      [ecpay, mutation],
    ),
  };
};
