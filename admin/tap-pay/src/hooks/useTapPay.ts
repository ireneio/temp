// import
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Modal } from 'antd';
import getConfig from 'next/config';

import { useTranslation } from '@meepshop/locales';

// typescript definition
type StatusType = 'number' | 'expiry' | 'ccv';

// definition
let initialTapPay: typeof window['TPDirect'];

const {
  publicRuntimeConfig: { ENV },
} = getConfig();

export default (
  setPrime: (prime: string | null) => void,
  hasErrors: boolean,
): {
  onLoad: () => void;
  errors: string[];
} => {
  const { t } = useTranslation('tap-pay');
  const [tapPay, setTapPay] = useState<typeof window['TPDirect']>(
    initialTapPay,
  );
  const [cardType, setCardType] = useState<string>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (hasErrors && cardType === 'unknown')
      Modal.warning({
        title: t('card-type-unknown.title'),
        content: t('card-type-unknown.description'),
        okText: t('ok'),
      });
  }, [hasErrors, cardType, t]);

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
  }, [t, tapPay]);

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
  }, [setPrime, tapPay]);

  return {
    onLoad: useCallback(() => {
      if (!window.TPDirect) return;

      const tapPayFunc = window.TPDirect;

      initialTapPay = tapPayFunc;

      setTapPay(tapPayFunc);

      tapPayFunc.setupSDK(
        '13026',
        'app_cmuVL2x5q6AGvmxP1i7sVtPAoKdqd3UpkEupUf5MRJZIJNR8B92cqq52Yv1B',
        ENV === 'production' ? 'production' : 'sandbox',
      );
    }, []),
    errors: useMemo(() => (hasErrors ? ['number', 'expiry', 'ccv'] : errors), [
      hasErrors,
      errors,
    ]),
  };
};
