// import
import React, { useCallback } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import styles from './styles/paymentFail.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('thank-you-page');
  const { query } = useRouter();

  // FIXME: should use client.resetStore and window.storePreviousPageUrl
  const goToCheckout = useCallback(() => {
    window.location.href = '/checkout';
  }, []);

  const goToHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const errorCode = query.error || (query.orderId as string).split('=')[1];
  const errorMessage = query.message;

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <ExclamationCircleOutlined />
          {t('title.payment-fail')}
        </div>

        <div className={styles.info}>
          <p>{t('info.payment-fail')}</p>

          {!errorCode && !errorMessage ? null : (
            <div className={styles.block}>
              <div>
                {t('error-code')}
                {errorCode}
              </div>
              <div>{errorMessage}</div>
            </div>
          )}
        </div>

        <div className={styles.button}>
          <Button onClick={() => goToCheckout()}>{t('back-to-cart')}</Button>

          <Button onClick={() => goToHome()}>{t('return')}</Button>
        </div>

        <div className={styles.hints}>{t('hints')}</div>
      </div>
    </div>
  );
});
