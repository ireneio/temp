// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/sender.less';

// graphql typescript
import { senderFragment as senderFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  setting: senderFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ form: { getFieldDecorator }, setting }: PropsType) => {
    const { t } = useTranslation('setting-store');

    return (
      <>
        <div className={styles.flexBetween}>
          <div>
            <div className={styles.label}>{t('sender-info.sender-name')}</div>
            <FormItem>
              {getFieldDecorator('senderName', {
                initialValue: setting?.setting?.senderInfo?.name,
              })(
                <Input
                  className={styles.input}
                  placeholder={t('sender-info.sender-name-placeholder')}
                />,
              )}
            </FormItem>
          </div>
          <div>
            <div className={styles.label}>
              {t('sender-info.sender-phone-number')}
            </div>
            <FormItem>
              {getFieldDecorator('phoneNumber', {
                initialValue: setting?.setting?.senderInfo?.phoneNumber,
              })(
                <Input
                  className={styles.input}
                  placeholder={t('sender-info.sender-phone-number-placeholder')}
                />,
              )}
            </FormItem>
          </div>
        </div>
        <div className={styles.label}>{t('sender-info.sender-address')}</div>
        {getFieldDecorator('streetAddress', {
          initialValue: setting?.setting?.senderInfo?.streetAddress,
        })(<Input placeholder={t('sender-info.sender-address')} />)}
      </>
    );
  },
);
