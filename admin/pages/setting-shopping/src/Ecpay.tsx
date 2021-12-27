// import
import React from 'react';
import { Form, Input, Select } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useValidateHalfWidth from './hooks/useValidateHalfWidth';
import styles from './styles/ecpay.less';

// definition
const { Item: FormItem } = Form;

export default React.memo(() => {
  const { t } = useTranslation('setting-shopping');
  const validateHalfWidth = useValidateHalfWidth();

  return (
    <div className={styles.ecpay}>
      <div className={styles.ecpaySetting}>
        {[
          {
            title: t('invoice.electronic.1.title'),
            name: ['setting', 'invoice', 'electronic', 'ecpay', 'MerchantID'],
          },
          {
            title: 'HashKey',
            name: ['setting', 'invoice', 'electronic', 'ecpay', 'HashKey'],
          },
          {
            title: 'HashIV',
            name: ['setting', 'invoice', 'electronic', 'ecpay', 'HashIV'],
          },
        ].map(({ title, name }) => (
          <div key={name.join('_')}>
            <h5 className={styles.h5}>{title}</h5>
            <FormItem
              name={name}
              rules={[
                {
                  required: true,
                  message: t('required'),
                },
                {
                  validator: validateHalfWidth,
                },
              ]}
              validateTrigger="onBlur"
              validateFirst
              initialValue=""
            >
              <Input placeholder={title} />
            </FormItem>
          </div>
        ))}
      </div>

      <div className={styles.callout}>
        <div>{t('invoice.electronic.0.ECPAY.tip.0')}</div>
        <div>{t('invoice.electronic.0.ECPAY.tip.1')}</div>
      </div>

      <h5 className={styles.h5}>{t('invoice.electronic.2.title')}</h5>
      <div className={styles.flex}>
        <FormItem
          name={['setting', 'invoice', 'electronic', 'isDelay']}
          validateTrigger="onBlur"
          initialValue={0}
        >
          <Select
            options={['NOW', 'DELAY'].map((value, index) => ({
              label: t(`invoice.electronic.2.${value}.name`),
              value: index,
            }))}
          />
        </FormItem>

        <FormItem
          noStyle
          dependencies={[['setting', 'invoice', 'electronic', 'isDelay']]}
        >
          {({ getFieldValue }) =>
            !getFieldValue([
              'setting',
              'invoice',
              'electronic',
              'isDelay',
            ]) ? null : (
              <FormItem
                name={['setting', 'invoice', 'electronic', 'delayDays']}
                validateTrigger="onBlur"
                initialValue={1}
              >
                <Select
                  options={[1, 10].map(value => ({
                    label: t(`invoice.electronic.2.DELAY.${value}`),
                    value,
                  }))}
                />
              </FormItem>
            )
          }
        </FormItem>
      </div>

      <FormItem
        noStyle
        dependencies={[['setting', 'invoice', 'electronic', 'isDelay']]}
      >
        {({ getFieldValue }) =>
          !getFieldValue(['setting', 'invoice', 'electronic', 'isDelay']) ? (
            <div className={styles.callout}>
              {t('invoice.electronic.2.NOW.tip')}
            </div>
          ) : (
            <div className={styles.callout}>
              {t('invoice.electronic.2.DELAY.tip.0')}
              <ul>
                <li>{t('invoice.electronic.2.DELAY.tip.1')}</li>
                <li>{t('invoice.electronic.2.DELAY.tip.2')}</li>
              </ul>
            </div>
          )
        }
      </FormItem>
    </div>
  );
});
