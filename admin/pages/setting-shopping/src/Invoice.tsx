// import
import React from 'react';
import { Select, Checkbox, Form, Divider } from 'antd';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import Switchitem from './SwitchItem';
import Ecpay from './Ecpay';
import {
  paperInvoiceType,
  electronicInvoiceType,
} from './hooks/useInvoiceType';
import styles from './styles/invoice.less';

// definition
const { Group } = Checkbox;
const { Item: FormItem } = Form;

export default React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting-shopping');

    return (
      <Block title={t('invoice.title')} description={t('invoice.desc')}>
        <Switchitem name={['setting', 'invoice', 'paper', 'isEnable']}>
          <section className={styles.section}>
            <h5 className={styles.h5}>
              {t('invoice.paper.title')}
              <span className={styles.error}>
                <FormItem noStyle shouldUpdate>
                  {({ getFieldError }) =>
                    getFieldError(['setting', 'invoice', 'paper', 'paperType'])
                  }
                </FormItem>
              </span>
            </h5>

            <FormItem
              noStyle
              name={['setting', 'invoice', 'paper', 'paperType']}
              rules={[
                {
                  min: 1,
                  type: 'array',
                  message: t('required-checkbox'),
                },
              ]}
              initialValue={[]}
            >
              <Group>
                {paperInvoiceType.map(item => (
                  <Checkbox key={item} value={item}>
                    {t(`invoice.paper.${item}`)}
                  </Checkbox>
                ))}
              </Group>
            </FormItem>
          </section>
        </Switchitem>

        <Divider />

        <Switchitem name={['setting', 'invoice', 'electronic', 'isEnable']}>
          <section className={styles.section}>
            <h5 className={styles.h5}>
              {t('invoice.electronic.3.title')}

              <span className={styles.error}>
                <FormItem noStyle shouldUpdate>
                  {({ getFieldError }) =>
                    getFieldError([
                      'setting',
                      'invoice',
                      'electronic',
                      'electronicType',
                    ])
                  }
                </FormItem>
              </span>
            </h5>

            <div className={styles.electronicType}>
              <FormItem
                noStyle
                name={['setting', 'invoice', 'electronic', 'electronicType']}
                rules={[
                  {
                    min: 1,
                    type: 'array',
                    message: t('required-checkbox'),
                  },
                ]}
                initialValue={[]}
              >
                <Group>
                  {electronicInvoiceType.map(item => (
                    <Checkbox key={item} value={item}>
                      {t(`invoice.electronic.3.${item}`)}
                    </Checkbox>
                  ))}
                </Group>
              </FormItem>
            </div>

            <h5 className={styles.h5}>{t('invoice.electronic.0.title')}</h5>
            <FormItem
              className={styles.electronicType}
              name={['setting', 'invoice', 'electronic', 'type']}
              validateTrigger="onBlur"
              initialValue="ECPAY"
            >
              <Select
                options={['ECPAY', 'MANUAL'].map(value => ({
                  label: t(`invoice.electronic.0.${value}.name`),
                  value,
                }))}
              />
            </FormItem>

            <FormItem
              noStyle
              dependencies={[['setting', 'invoice', 'electronic', 'type']]}
            >
              {({ getFieldValue }) =>
                getFieldValue(['setting', 'invoice', 'electronic', 'type']) ===
                'MANUAL' ? (
                  <div className={styles.callout}>
                    {t('invoice.electronic.0.MANUAL.tip')}
                  </div>
                ) : (
                  <Ecpay />
                )
              }
            </FormItem>
          </section>
        </Switchitem>
      </Block>
    );
  },
);
