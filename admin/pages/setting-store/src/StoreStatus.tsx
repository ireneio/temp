// import
import React from 'react';
import { Form, Radio } from 'antd';

import { useTranslation } from '@meepshop/locales';

import { STORESTATUS } from './constants';
import styles from './styles/storeStatus.less';

// definition
const { Item: FormItem } = Form;
const { Group } = Radio;

export default React.memo(() => {
  const { t } = useTranslation('setting-store');

  return (
    <div className={styles.root}>
      <div className={styles.label}>{t('store-status.store-sub-title')}</div>

      <FormItem name={['storeStatus']}>
        <Group className={styles.radioGroup}>
          {STORESTATUS.map(value => (
            <Radio key={value} className={styles.radio} value={value}>
              {t(`store-status.${value}`)}
            </Radio>
          ))}
        </Group>
      </FormItem>

      <div className={styles.alert}>
        <div className={styles.alertText1}>
          {t(`store-status.store-status-alert-1`)}
        </div>

        <div className={styles.alertText2}>
          {t(`store-status.store-status-alert-2`)}
        </div>
      </div>
    </div>
  );
});
