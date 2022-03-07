// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';
import Alert from '@store/alert';

import styles from './styles/alert.less';

// graphql import
import { alertFragment } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  activeUpsellingArea: alertFragment | null;
  isUpsellingOverLimit: boolean;
  isOnlyUpselling: boolean;
  hasError: boolean;
}

// definition
export default React.memo(
  ({
    activeUpsellingArea,
    isUpsellingOverLimit,
    isOnlyUpselling,
    hasError,
  }: PropsType) => {
    const { t } = useTranslation('cart');

    if (!activeUpsellingArea) return null;

    return (
      <>
        {!isUpsellingOverLimit ? null : (
          <Alert
            className={styles.error}
            type="error"
            message={t('alert.upselling-over-limit', {
              amount: activeUpsellingArea.limitPerOrder || 0,
            })}
            showIcon
          />
        )}

        {!isOnlyUpselling ? null : (
          <Alert
            className={`${styles.error} ${!hasError ? styles.hidden : ''}`}
            type="warning"
            message={t('alert.only-upselling')}
            showIcon
          />
        )}
      </>
    );
  },
);
