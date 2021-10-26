// import
import React from 'react';
import { Form, InputNumber } from 'antd';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import SwitchItem from './SwitchItem';
import styles from './styles/advanced.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block title={t('advanced.title')} description={t('advanced.desc')}>
        {[
          ['apps', 'wishList'],
          ['apps', 'productNotice'],
          ['apps', 'returnOrder'],
          ['apps', 'replacement'],
          ['setting', 'lockedBirthday'],
          ['apps', 'memberSeePrice'],
        ].map(name => (
          <SwitchItem key={name.join('_')} name={name} />
        ))}

        <SwitchItem name={['setting', 'rewardPointReminder', 'isEnabled']}>
          <FormItem className={styles.top}>
            <FormItem
              noStyle
              name={['setting', 'rewardPointReminder', 'daysPrior']}
              rules={[
                {
                  required: true,
                  message: t('advanced.error'),
                },
              ]}
              initialValue={7}
            >
              <InputNumber min={1} max={30} />
            </FormItem>
            <span className={styles.daysPrior}>{t('advanced.days-prior')}</span>
          </FormItem>
        </SwitchItem>
      </Block>
    );
  },
);
