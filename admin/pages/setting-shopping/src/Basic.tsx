// import
import React from 'react';
import { Checkbox, Form } from 'antd';

import Block from '@admin/block';
import Tooltip from '@admin/tooltip';
import { useTranslation, languages } from '@meepshop/locales';

import styles from './styles/basic.less';

// definition
const { Item: FormItem } = Form;
const { Group } = Checkbox;
const currencys = [
  'TWD',
  'EUR',
  'CNY',
  'VND',
  'USD',
  'KRW',
  'JPY',
  'HKD',
  'MYR',
  'SGD',
];

export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block title={t('basic.title')} description={t('basic.desc')}>
        {[
          {
            name: ['setting', 'locale'],
            title: t('basic.0.title'),
            options: languages.map(lan => ({
              value: lan,
              label: t(`locales.${lan}`),
            })),
          },
          {
            name: ['setting', 'currency'],
            title: t('basic.1.title'),
            tip: t('basic.1.tip'),
            options: currencys.map(currency => ({
              value: currency,
              label: currency,
            })),
          },
        ].map(({ name, title, tip, options }) => (
          <div key={name.join('_')} className={styles.basic}>
            <h3 className={styles.h3}>
              {title}
              <Tooltip iconClassName={styles.tip} title={tip} />
              <span className={styles.error}>
                <FormItem noStyle shouldUpdate>
                  {({ getFieldError }) => getFieldError(name)}
                </FormItem>
              </span>
            </h3>

            <FormItem
              noStyle
              name={name}
              rules={[
                {
                  min: 1,
                  type: 'array',
                  message: t('required-checkbox'),
                },
              ]}
            >
              <Group className={styles.group} options={options} />
            </FormItem>
          </div>
        ))}
      </Block>
    );
  },
);
