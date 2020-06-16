// import typescript
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import { Form as AntdForm, DatePicker, Input } from 'antd';
import moment from 'moment';
import { isNumeric, isInt } from 'validator';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import CreditCardInput from './CreditCardInput';
import InstallmentFormItem from './InstallmentFormItem';
import styles from './styles/form.less';

// typescript definition
interface PropsType extends FormComponentProps, I18nPropsType {
  isInstallment: boolean;
  storePaymentId: string;
}

// definition
const { Item: FormItem } = AntdForm;
const { MonthPicker } = DatePicker;

class Form extends React.PureComponent<PropsType> {
  public render(): React.ReactNode {
    const {
      // HOC
      form: { getFieldDecorator, getFieldValue },
      t,

      // props
      isInstallment,
      storePaymentId,
    } = this.props;

    return (
      <>
        <FormItem>
          {getFieldDecorator('cardNumber', {
            rules: [
              {
                type: 'array',
                required: true,
                message: t('form.required'),
              },
              {
                validator: (_, value, callback) => {
                  if (!isNumeric((value || []).join('')))
                    return callback(t('form.cardNumberError'));

                  return callback();
                },
              },
            ],
          })(<CreditCardInput />)}
        </FormItem>

        <div className={styles.expireAndSecurityCode}>
          <FormItem>
            {getFieldDecorator('expire', {
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
              ],
            })(
              <MonthPicker
                placeholder={t('expire')}
                disabledDate={current =>
                  Boolean(current && current < moment().endOf('day'))
                }
              />,
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('securityCode', {
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
                {
                  validator: (_, value, callback) => {
                    if (!isInt(value || '', { min: 0, max: 999 }))
                      return callback(t('form.securityCodeError'));

                    return callback();
                  },
                },
              ],
            })(<Input maxLength={3} placeholder={t('securityCode')} />)}
          </FormItem>
        </div>

        <FormItem>
          {getFieldDecorator('cardHolderName', {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
          })(<Input placeholder={t('cardHolderName')} />)}
        </FormItem>

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
                cardNumber={(getFieldValue('cardNumber') || []).join('')}
              />,
            )}
          </FormItem>
        )}
      </>
    );
  }
}

export default withTranslation('gmo-credit-card-form')(Form);
