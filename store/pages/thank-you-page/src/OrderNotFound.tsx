// import
import React, { useContext } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useClipboard } from '@meepshop/hooks';
import { useTranslation } from '@meepshop/locales';
import Link, { useRouter } from '@meepshop/link';

import styles from './styles/orderNotFound.less';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('thank-you-page');
  const { domain, asPath } = useRouter();

  useClipboard({
    target: 'button[role="copy"]',
    text: () => `${t('data-error')}https://${domain}${asPath}`,
    success: () => {
      message.success(t('copied'));
    },
  });

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          <ExclamationCircleOutlined />
          {t('title.error')}
        </div>

        <div className={styles.description}>
          <div>{t('info.error.0')}</div>
          <div>{t('info.error.1')}</div>
        </div>

        <div className={styles.button}>
          <Link href="/orders">
            <Button>{t('order')}</Button>
          </Link>

          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <Button role="copy">{t('copy')}</Button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${colors[0]};
            }

            .${styles.description} {
              color: ${transformColor(colors[3]).alpha(0.8)};
            }

            .${styles.button} .ant-btn:first-child {
              color: ${colors[0]};
              background-color: ${colors[3]};
              border-color: ${colors[3]};
            }

            .${styles.button} .ant-btn:last-child {
              color: ${colors[3]};
              background-color: ${colors[0]};
              border-color: ${colors[3]};
            }
          `,
        }}
      />
    </>
  );
});
