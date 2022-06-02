// import
import React from 'react';
import { Progress } from 'antd';
import Script from 'next/script';

import { useTranslation } from '@meepshop/locales';
import {
  tapPayGenieLoading_w288 as tapPayGenieLoading,
  tapPayCheckOutSuccess_w289 as tapPayCheckOutSuccess,
} from '@meepshop/images';

import useTapPay from './hooks/useTapPay';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  setPrime: (prime: string | null) => void;
  hasErrors: boolean;
  loading: boolean;
  success: {
    [key: string]: string;
  } | null;
}

// definition
export default React.memo(
  ({ setPrime, hasErrors, loading, success }: PropsType) => {
    const { t } = useTranslation('tap-pay');
    const { onLoad, errors } = useTapPay(setPrime, hasErrors);

    return (
      <>
        <div className={styles.root}>
          <Script
            id="tap-pay-sdk-js"
            strategy="lazyOnload"
            src="https://js.tappaysdk.com/tpdirect/v5.1.0"
            onLoad={onLoad}
          />

          {['number', 'expiry', 'ccv'].map(key => (
            <div key={key}>
              <div className={styles.label}>{t(key)}</div>

              <div
                id={key}
                className={`${styles.input} ${
                  errors.includes(key) ? styles.error : ''
                }`}
              />

              {!errors.includes(key) ? null : (
                <div className={styles.error}>{t(`check-${key}`)}</div>
              )}
            </div>
          ))}
        </div>

        {!loading ? null : (
          <div className={styles.status}>
            <img src={tapPayGenieLoading} alt="meepshop" />
            <div className={styles.loading}>{t('loading')}</div>
            <Progress percent={50} />
          </div>
        )}

        {!success ? null : (
          <div className={styles.status}>
            <img src={tapPayCheckOutSuccess} alt="meepshop" />
            <div className={styles.title}>{success?.title}</div>
            <div className={styles.description}>{success?.description}</div>
          </div>
        )}
      </>
    );
  },
);
