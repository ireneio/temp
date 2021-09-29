// import
import React from 'react';
import { Form, Select, Divider } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';

import { LOCALE, TIMEZONE } from './constants';
import styles from './styles/interface.less';

// graphql typescript
import { interfaceFragment as interfaceFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: interfaceFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('setting-store');

  return (
    <div className={styles.contentMarginBottom}>
      <span className={styles.notEditableLabel}>{t('interface.currency')}</span>

      <Tooltip
        iconClassName={styles.questionIcon}
        title={t('interface.currency-tip')}
      />

      <div className={styles.notEditableValue}>{store?.currency}</div>

      <Divider />

      <div className={styles.flexBetween}>
        <div>
          <span className={styles.label}>{t('interface.locale')}</span>

          <Tooltip
            iconClassName={styles.questionIcon}
            title={t('interface.locale-tip')}
          />

          <FormItem
            name={['locale']}
            rules={[{ required: true, message: t('required') }]}
          >
            <Select className={styles.select}>
              {LOCALE.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.text}
                </Option>
              ))}
            </Select>
          </FormItem>
        </div>

        <div>
          <div className={styles.label}>{t('interface.timezone')}</div>

          <FormItem
            name={['timezone']}
            rules={[{ required: true, message: t('required') }]}
          >
            <Select className={styles.select}>
              {TIMEZONE.map(item => (
                <Option key={item.value} value={item.value}>
                  {t(item.text)}
                </Option>
              ))}
            </Select>
          </FormItem>
        </div>
      </div>
    </div>
  );
});
