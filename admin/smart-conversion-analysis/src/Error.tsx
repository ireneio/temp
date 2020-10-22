// import
import React from 'react';
import { Button } from 'antd';

import { smartConversionError } from '@meepshop/images';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/error.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('smart-conversion-analysis');

  return (
    <div className={styles.root}>
      <img src={smartConversionError} alt="meepshop" />
      <h1>{t('error')}</h1>
      <p>{t('contact')}</p>
      <p>Oops! There’s something wrong.</p>
      <Button onClick={() => window.close()}>{t('close')}</Button>
      <footer>{`meepShop ${t('service')}(02) 2925-8922`}</footer>
    </div>
  );
});
