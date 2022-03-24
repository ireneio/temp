// import
import React, { useMemo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { addDays, endOfMonth, format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/expirationDate.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('setting-apps');
  const expirationDate = useMemo(
    () => format(addDays(endOfMonth(new Date()), 1), 'yyyy/MM/dd'),
    [],
  );

  return (
    <span className={styles.root}>
      <InfoCircleOutlined />

      {t('expiration-date', {
        expirationDate,
      })}
    </span>
  );
});
