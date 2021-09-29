// import
import React from 'react';
import { Form, Radio, Popconfirm } from 'antd';
import {
  PlusCircleOutlined,
  CreditCardOutlined,
  BankOutlined,
} from '@ant-design/icons';

import Block from '@admin/block';
import { useTranslation } from '@meepshop/locales';

import useSetCreditCard from './hooks/useSetCreditCard';
import styles from './styles/payment.less';

// graphql typescript
import {
  paymentFragment,
  StoreBillingPaymentMethodEnum,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: paymentFragment | null;
}

// definition
const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;

export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('payment-setting');
  const { removeCreditCard } = useSetCreditCard(store?.id || null);

  const creditCard = store?.setting?.billing?.payment?.creditCard || null;

  return (
    <Block title={t('payment.title')} description={t('payment.description')}>
      <div className={styles.header}>
        <div>{t('payment.payment-method')}</div>
        {/* TODO: when use new api
          <div className={styles.button}>
            {t('payment.CREDIT_CARD.replace')}
          </div> */}
      </div>

      <FormItem
        shouldUpdate={(prev, cur) =>
          prev.payment?.method !== cur.payment?.method
        }
        noStyle
      >
        {({ getFieldValue, setFieldsValue }) =>
          !getFieldValue(['payment', 'method']) ? (
            <div
              className={styles.setUp}
              onClick={() =>
                setFieldsValue({
                  payment: {
                    method: 'CREDIT_CARD' as StoreBillingPaymentMethodEnum,
                  },
                })
              }
            >
              <PlusCircleOutlined />
              {t('payment.set-payment-method')}
            </div>
          ) : (
            <FormItem name={['payment', 'method']}>
              <RadioGroup className={styles.radioGroup}>
                {[
                  {
                    value: 'CREDIT_CARD',
                    icon: <CreditCardOutlined />,
                  },
                  {
                    value: 'ATM',
                    icon: <BankOutlined />,
                  },
                ].map(({ value, icon }) => (
                  <Radio key={value} value={value}>
                    <div>
                      {icon}
                      {t(`payment.${value}.title`)}
                    </div>
                    <div>{t(`payment.${value}.description`)}</div>

                    {!(value === 'CREDIT_CARD' && creditCard) ? null : (
                      <div className={styles.action}>
                        <div className={styles.lastFourDigit}>
                          {`**** **** **** ${creditCard?.lastFourDigit}`}
                        </div>

                        <Popconfirm
                          placement="top"
                          title={t('payment.CREDIT_CARD.delete-confirm')}
                          onConfirm={() =>
                            removeCreditCard(creditCard?.id || null)
                          }
                          okText={t('delete')}
                          cancelText={t('cancel')}
                        >
                          <div className={styles.button}>
                            {t('payment.CREDIT_CARD.delete')}
                          </div>
                        </Popconfirm>
                      </div>
                    )}
                  </Radio>
                ))}
              </RadioGroup>
            </FormItem>
          )
        }
      </FormItem>

      {/* TODO: when use new api
        <div className={styles.creditCard}>
          <div className={styles.icon}>
            <CreditCardOutlined />
          </div>

          <div>
            <div className={styles.title}>{t('payment.CREDIT_CARD.title')}</div>
            <div>{t('payment.CREDIT_CARD.expire')}</div>
          </div>
        </div> */}
    </Block>
  );
});
