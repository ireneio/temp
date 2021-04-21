// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Radio } from 'antd';

import { useTranslation } from '@meepshop/locales';

import { STORESTATUS } from './constants';
import styles from './styles/storeStatus.less';

// graphql typescript
import { storeStatusFragment as storeStatusFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  setting: storeStatusFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Group } = Radio;

export default React.memo(
  ({ form: { getFieldDecorator }, setting }: PropsType) => {
    const { t } = useTranslation('setting-store');

    return (
      <div className={styles.root}>
        <div className={styles.label}>{t('store-status.store-sub-title')}</div>
        <FormItem>
          {getFieldDecorator('storeStatus', {
            initialValue: setting?.metaData?.storeStatus,
          })(
            <Group className={styles.radioGroup}>
              {STORESTATUS.map(value => (
                <Radio key={value} className={styles.radio} value={value}>
                  {t(`store-status.${value}`)}
                </Radio>
              ))}
            </Group>,
          )}
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
  },
);
