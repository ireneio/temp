// import
import React from 'react';
import { Input, Form, Divider } from 'antd';

import Block from '@admin/block';
import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import SwitchItem from './SwitchItem';
import styles from './styles/order.less';

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;
export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block title={t('order.title')} description={t('order.desc')}>
        <h3 className={styles.h3}>
          {t('order.0.title')}
          <Tooltip iconClassName={styles.tip} title={t('order.0.tip')} />
        </h3>

        {[
          ['setting', 'order', 'afterPaymentFail'],
          ['setting', 'order', 'autoAddStock'],
        ].map(name => (
          <SwitchItem key={name.join('_')} name={name} />
        ))}

        <Divider />

        <h3 className={styles.h3}>
          {t('order.1.title')}
          <Tooltip iconClassName={styles.tip} title={t('order.1.tip')} />
        </h3>

        <FormItem className={styles.formItem} name={['setting', 'paidMessage']}>
          <TextArea rows={12} />
        </FormItem>
      </Block>
    );
  },
);
