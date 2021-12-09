// import
import React, { useState, useCallback } from 'react';
import getConfig from 'next/config';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import Script from 'next/script';

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
  ecpayScript: JSX.Element | null;
  ecpayLoading: boolean;
  getPaymentInfo: () => Promise<
    { payToken: string; paymentType: string } | undefined
  >;
} => {
  const [ecpayLoading, setEcpayLoading] = useState<boolean>(true);
  const [ecpay, setEcpay] = useState<typeof window['ECPay']>();
  const [jQueryLoaded, setJQueryLoaded] = useState(false);
  const [mutation] = useMutation<logType, logVariables>(log);

  return {
    ecpayScript: !token ? null : (
      <>
        <Script
          id="jQuery-js"
          strategy="lazyOnload"
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          onLoad={() => {
            setJQueryLoaded(true);
          }}
        />
        {!jQueryLoaded ? null : (
          <>
            <Script
              id="node-forge-js"
              strategy="lazyOnload"
              src="https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js"
            />
            <Script
              id="ecpay-js"
              strategy="lazyOnload"
              src={`https://${
                ENV === 'production' ? 'ecpg' : 'ecpg-stage'
              }.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116`}
              onLoad={() => {
                if (!window.ECP) return;

                const ecpayFunc = new window.ECP();

                setEcpay(ecpayFunc);

                if (ecpayFunc && token) {
                  ecpayFunc.initialize(
                    ecpayFunc.ServerType[
                      ENV === 'production' ? 'Prod' : 'Stage'
                    ],
                    isNeedDefaultLoading ? 1 : 0,
                    initializeError => {
                      if (!initializeError) {
                        ecpayFunc.createPayment(
                          token,
                          ecpayFunc.Language[language || 'zhTW'],
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
                }
              }}
              onError={() => {
                notification.error({
                  message: 'ECPay Error',
                  description: 'ecpay sdk not found',
                });
              }}
            />
          </>
        )}
      </>
    ),
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
