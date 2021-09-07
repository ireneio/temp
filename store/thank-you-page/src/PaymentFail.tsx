// import
import React, { useCallback } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';

import styles from './styles/paymentFail.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('thank-you-page');
  const { query } = useRouter();

  // FIXME: should use client.resetStore and window.storePreviousPageUrl
  const goToCheckout = useCallback(() => {
    window.location.href = '/checkout';
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}>
          <ExclamationCircleOutlined />
          {t('title.payment-fail')}
        </div>

        <div className={styles.info}>
          <p>{t('info.payment-fail')}</p>

          <div className={styles.block}>
            <div>
              {t('error-code')}
              {query.error || (query.orderId as string).split('=')[1]}
            </div>
            <div>{query.message}</div>
          </div>
        </div>

        <div className={styles.button}>
          <Button onClick={() => goToCheckout()}>{t('back-to-cart')}</Button>

          <Link href="/">
            <Button>{t('return')}</Button>
          </Link>
        </div>

        <div className={styles.hints}>{t('hints')}</div>
      </div>
    </div>
  );
});
