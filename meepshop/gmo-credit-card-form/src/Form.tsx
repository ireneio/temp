// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import CreditCardInput from './CreditCardInput';
import ExpireInput from './ExpireInput';
import InstallmentFormItem from './InstallmentFormItem';
import useValidator from './hooks/useValidator';
import styles from './styles/form.less';

// typescript definition
interface PropsType {
  isInstallment: boolean;
  storePaymentId: string;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ isInstallment, storePaymentId }: PropsType) => {
  const { t } = useTranslation('gmo-credit-card-form');
  const {
    validateCardNumber,
    validateExpire,
    validateSecurityCode,
  } = useValidator();

  return (
    <>
      <FormItem
        name={['cardHolderName']}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
        ]}
        validateTrigger="onBlur"
      >
        <Input placeholder={t('cardHolderName')} />
      </FormItem>

      <div className={styles.cardNumber}>
        <FormItem
          name={['cardNumber']}
          rules={[
            {
              required: true,
              message: t('form.required'),
            },
            {
              validator: validateCardNumber,
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <CreditCardInput />
        </FormItem>
      </div>

      <div className={styles.expireAndSecurityCode}>
        <FormItem
          name={['expire']}
          rules={[
            {
              required: true,
              message: t('form.required'),
            },
            {
              validator: validateExpire,
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <ExpireInput />
        </FormItem>

        <FormItem
          name={['securityCode']}
          rules={[
            {
              required: true,
              message: t('form.required'),
            },
            {
              validator: validateSecurityCode,
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <Input maxLength={3} placeholder={t('securityCode')} />
        </FormItem>
      </div>

      {!isInstallment ? null : (
        <FormItem dependencies={['installmentCode', 'cardNumber']} noStyle>
          {({ getFieldValue }) => (
            <FormItem
              name={['installmentCode']}
              rules={[
                {
                  required: true,
                  message: t('form.required'),
                },
              ]}
            >
              <InstallmentFormItem
                storePaymentId={storePaymentId}
                cardNumber={getFieldValue(['cardNumber']) || ''}
              />
            </FormItem>
          )}
        </FormItem>
      )}
    </>
  );
});
