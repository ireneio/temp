// import
import React, { useContext, useCallback } from 'react';
import Notification from 'rc-notification';

import { Colors as ColorsContext } from '@meepshop/context';
import { AddToCartIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';

import styles from '../styles/useAddToCartNotification.less';

// definition
export default (): (() => void) => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('notification');

  return useCallback(() => {
    Notification.newInstance(
      {
        prefixCls: styles.root,
        style: {},
      },
      notification => {
        notification.notice({
          content: (
            <>
              <div className={styles.wrapper}>
                <AddToCartIcon />
                {t('added-to-cart')}
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .${styles.wrapper} {
                      background-color: ${colors[3]};
                      color: ${colors[0]};
                    }
                  `,
                }}
              />
            </>
          ),
          onClose: () => notification.destroy(),
        });
      },
    );
  }, [colors, t]);
};
