// import typescript
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Form as AntdForm, DatePicker, Input, InputNumber } from 'antd';
import moment from 'moment';
import { isNumeric } from 'validator';

import { withNamespaces } from '@store/utils/lib/i18n';

import CreditCardInput from './CreditCardInput';
import InstallmentFormItem from './InstallmentFormItem';
import styles from './styles/form.less';

// typescript definition
interface PropsType extends FormComponentProps, I18nPropsType {
  exist: boolean;
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

        <div className={styles.expireAndSeecurityCode}>
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
              ],
            })(
              <InputNumber
                min={0}
                max={999}
                maxLength={3}
                placeholder={t('securityCode')}
              />,
            )}
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

export default withNamespaces('gmo-credit-card-form')(Form);
