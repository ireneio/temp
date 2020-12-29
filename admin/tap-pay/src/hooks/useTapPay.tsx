// import
import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from 'antd';
import getConfig from 'next/config';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// typescript definition
type StatusType = 'number' | 'expiry' | 'ccv';

// definition
const {
  publicRuntimeConfig: { ENV },
} = getConfig();

export default (
  setPrime: (prime: string | null) => void,
  hasErrors: boolean,
): {
  tapPayScript: React.ReactNode;
  errors: string[];
} => {
  const { t } = useTranslation('tap-pay');
  const [tapPay, setTapPay] = useState<typeof window['TPDirect']>();
  const [cardType, setCardType] = useState<string>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const tapPayInterval = setInterval(() => {
      if (window.TPDirect) clearInterval(tapPayInterval);
      setTapPay(window.TPDirect);
    }, 100);
  }, []);

  useEffect(() => {
    if (tapPay)
      tapPay.setupSDK(
        '13026',
        'app_cmuVL2x5q6AGvmxP1i7sVtPAoKdqd3UpkEupUf5MRJZIJNR8B92cqq52Yv1B',
        ENV === 'production' ? 'production' : 'sandbox',
      );
  }, [tapPay]);

  useEffect(() => {
    if (tapPay)
      tapPay.card.setup({
        fields: {
          number: {
            element: '#number',
            placeholder: '**** **** **** ****',
          },
          expirationDate: {
            element: '#expiry',
            placeholder: 'MM / YY',
          },
          ccv: {
            element: '#ccv',
            placeholder: t('please-enter-ccv'),
          },
        },
        styles: {
          input: {
            color: 'rgba(0,0,0,0.65)',
          },
        },
      });
  }, [tapPay, t]);

  useEffect(() => {
    if (tapPay)
      tapPay.card.onUpdate(({ canGetPrime, cardType: type, status }) => {
        setPrime('');

        setErrors(
          ['number', 'expiry', 'ccv'].filter(
            (key: StatusType) => status[key] === 2,
          ),
        );

        setCardType(type);

        if (canGetPrime) {
          tapPay.card.getPrime(
            ({ status: getPrimeStatus, card: { prime } }) => {
              setPrime(getPrimeStatus === 0 ? prime : null);
            },
          );
        }
      });
  }, [tapPay, setPrime]);

  useEffect(() => {
    if (hasErrors && cardType === 'unknown')
      Modal.warning({
        title: t('card-type-unknown.title'),
        content: t('card-type-unknown.description'),
        okText: t('ok'),
      });
  }, [hasErrors, cardType, t]);

  return {
    tapPayScript: (
      <script src="https://js.tappaysdk.com/tpdirect/v5.1.0" async defer />
    ),
    errors: useMemo(() => (hasErrors ? ['number', 'expiry', 'ccv'] : errors), [
      hasErrors,
      errors,
    ]),
  };
};
