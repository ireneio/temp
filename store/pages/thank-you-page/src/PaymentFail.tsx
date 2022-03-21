// import
import React, { useContext, useCallback } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import styles from './styles/paymentFail.less';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('thank-you-page');
  const { query } = useRouter();

  // FIXME: should use client.resetStore
  const goToCheckout = useCallback(() => {
    window.location.href = '/checkout';
  }, []);

  const goToHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const goToRedirectUrl = useCallback(() => {
    window.location.href = query.redirectUrl as string;
  }, [query]);

  const errorCode = query.error || (query.orderId as string).split('=')[1];
  const errorMessage = query.message;

  return (
    <>
      <div className={styles.root}>
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
          {query.redirectUrl ? (
            <Button onClick={() => goToRedirectUrl()}>{t('back')}</Button>
          ) : (
            <>
              <Button onClick={() => goToCheckout()}>
                {t('back-to-cart')}
              </Button>

              <Button onClick={() => goToHome()}>{t('return')}</Button>
            </>
          )}
        </div>

        <div className={styles.hints}>{t('hints')}</div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${colors[0]};
              color: ${colors[3]};
            }

            .${styles.button} .ant-btn:nth-child(1) {
              color: ${colors[0]};
              background-color: ${colors[3]};
              border-color: ${colors[3]};
            }

            .${styles.button} .ant-btn:nth-child(2) {
              color: ${colors[3]};
              background-color: ${colors[0]};
              border-color: ${colors[3]};
            }

            .${styles.info} > p {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.block} {
              background-color: ${colors[1]};
              box-shadow: 0 2px 15px 0 ${transformColor(colors[3]).alpha(0.15)};
            }

            .${styles.block} > div:first-child {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.hints} {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }
          `,
        }}
      />
    </>
  );
});
