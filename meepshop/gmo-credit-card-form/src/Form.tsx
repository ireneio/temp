// typescript import
import { FormComponentProps } from 'antd/lib/form';

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
interface PropsType extends FormComponentProps {
  isInstallment: boolean;
  storePaymentId: string;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    form: { getFieldDecorator, getFieldValue },
    isInstallment,
    storePaymentId,
  }: PropsType) => {
    const { t } = useTranslation('gmo-credit-card-form');
    const {
      validateCardNumber,
      validateExpire,
      validateSecurityCode,
    } = useValidator();

    return (
      <>
        <FormItem>
          {getFieldDecorator('cardHolderName', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
          })(<Input placeholder={t('cardHolderName')} />)}
        </FormItem>

        <div className={styles.cardNumber}>
          <FormItem>
            {getFieldDecorator('cardNumber', {
              validateTrigger: 'onBlur',
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
                {
                  validator: validateCardNumber,
                },
              ],
            })(<CreditCardInput />)}
          </FormItem>
        </div>

        <div className={styles.expireAndSecurityCode}>
          <FormItem>
            {getFieldDecorator('expire', {
              validateTrigger: 'onBlur',
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
                {
                  validator: validateExpire,
                },
              ],
            })(<ExpireInput />)}
          </FormItem>

          <FormItem>
            {getFieldDecorator('securityCode', {
              validateTrigger: 'onBlur',
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
                {
                  validator: validateSecurityCode,
                },
              ],
            })(<Input maxLength={3} placeholder={t('securityCode')} />)}
          </FormItem>
        </div>

        {!isInstallment ? null : (
          <FormItem>
            {getFieldDecorator('installmentCode', {
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
              ],
            })(
              <InstallmentFormItem
                storePaymentId={storePaymentId}
                cardNumber={getFieldValue('cardNumber') || ''}
              />,
            )}
          </FormItem>
        )}
      </>
    );
  },
);
