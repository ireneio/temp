// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/domain.less';

// graphql typescript
import { domainFragment as domainFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  setting: domainFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ form: { getFieldDecorator }, setting }: PropsType) => {
    const { t } = useTranslation('setting-store');

    return (
      <>
        <div className={styles.label}>{t('domain.domain-sub-title')}</div>
        <FormItem>
          {getFieldDecorator('domain', {
            initialValue: setting?.domain?.[0],
          })(<Input placeholder="www.abc.com.tw" />)}
        </FormItem>
        <div className={styles.alert}>
          <div className={styles.alertTitle}>{t('domain.domain-alert-1')}</div>
          <div className={styles.alertText}>
            {t('domain.domain-alert-2')}
            <span className={styles.email}> service@meepshop.com</span>
          </div>
          <div className={styles.alertTitle}>{t('domain.domain-alert-3')}</div>
          <div className={styles.alertText}>{t('domain.domain-alert-4')}</div>
        </div>
      </>
    );
  },
);
