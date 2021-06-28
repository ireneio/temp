// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/sender.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('setting-store');

  return (
    <>
      <div className={styles.flexBetween}>
        <div>
          <div className={styles.label}>{t('sender-info.sender-name')}</div>

          <FormItem name={['setting', 'senderInfo', 'name']}>
            <Input
              className={styles.input}
              placeholder={t('sender-info.sender-name-placeholder')}
            />
          </FormItem>
        </div>

        <div>
          <div className={styles.label}>
            {t('sender-info.sender-phone-number')}
          </div>

          <FormItem name={['setting', 'senderInfo', 'phoneNumber']}>
            <Input
              className={styles.input}
              placeholder={t('sender-info.sender-phone-number-placeholder')}
            />
          </FormItem>
        </div>
      </div>

      <div className={styles.label}>{t('sender-info.sender-address')}</div>

      <FormItem name={['setting', 'senderInfo', 'streetAddress']}>
        <Input placeholder={t('sender-info.sender-address')} />
      </FormItem>
    </>
  );
});
