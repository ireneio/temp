// import
import React from 'react';
import { Spin } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/loading.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('smart-conversion-analysis');

  return (
    <div className={styles.root}>
      <Spin size="large" />
      <p>{t('loading')}</p>
    </div>
  );
});
