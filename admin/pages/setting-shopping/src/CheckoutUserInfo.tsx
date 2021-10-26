// import
import React from 'react';
import { Radio, Form } from 'antd';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/checkoutUserInfo.less';

// definition
const checkoutFields = ['name', 'mobile', 'address'];
const checkoutFieldStatus = ['REQUIRED', 'OPTIONAL', 'HIDDEN'];
const { Group } = Radio;
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('setting-shopping');

  return (
    <Block
      title={t('checkoutUserSetting.title')}
      description={t('checkoutUserSetting.desc')}
    >
      <div className={`${styles.flex} ${styles.columnName}`}>
        <div className={styles.column}>{t('checkoutUserSetting.column')}</div>
        <div className={styles.options}>
          {checkoutFieldStatus.map(key => (
            <div key={key}>{t(`checkoutUserSetting.${key}`)}</div>
          ))}
        </div>
      </div>

      {checkoutFields.map(key => (
        <div key={key} className={`${styles.flex} ${styles.border}`}>
          <div className={styles.title}>{t(`checkoutUserSetting.${key}`)}</div>

          <FormItem
            className={styles.formItem}
            name={['setting', 'checkoutFields', key]}
          >
            <Group className={styles.group}>
              {checkoutFieldStatus.map(status => (
                <div key={status} className={styles.radio}>
                  <Radio value={status} />
                </div>
              ))}
            </Group>
          </FormItem>
        </div>
      ))}
    </Block>
  );
});
