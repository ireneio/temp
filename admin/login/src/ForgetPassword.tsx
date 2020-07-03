// typescript import
import { PropsType } from './index';

// import
import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { meepshopLogo } from '@meepshop/images';

import useSendResetPasswordEmail from './hooks/useSendResetPasswordEmail';

import styles from './styles/forgetPassword.less';

// graphql typescript
import { UserTypeEnum } from '../../../__generated__/admin';

// definition
const { Item: FormItem } = Form;

export default Form.create<PropsType>()(
  React.memo(
    ({
      setAction,
      form: { getFieldDecorator, getFieldValue, validateFields },
    }: PropsType) => {
      const { t } = useTranslation('login');
      const {
        loading,
        countdown,
        sendResetPasswordEmail,
      } = useSendResetPasswordEmail();

      return (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <img src={meepshopLogo} alt="meepshop" />
            <div>{t('forget-password.title')}</div>
            <div>{t('forget-password.description')}</div>

            <FormItem className={styles.helper}>
              {getFieldDecorator('isHelper', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>{t('helper.is-helper')}</Checkbox>)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: t('email.error'),
                  },
                  {
                    type: 'email',
                    message: t('email.error'),
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Input placeholder={t('email.placeholder')} size="large" />)}
            </FormItem>

            {!getFieldValue('isHelper') ? null : (
              <FormItem>
                {getFieldDecorator('cname', {
                  rules: [
                    {
                      required: true,
                      message: t('cname.error'),
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(<Input placeholder={t('cname.placeholder')} size="large" />)}
              </FormItem>
            )}

            <Button
              loading={loading}
              disabled={countdown > 0}
              type="primary"
              size="large"
              onClick={() => {
                validateFields((errors, { isHelper, email, cname }) => {
                  if (!errors) {
                    sendResetPasswordEmail({
                      input: {
                        type: (isHelper
                          ? 'HELPER'
                          : 'MERCHANT') as UserTypeEnum,
                        email,
                        cname,
                      },
                    });
                  }
                });
              }}
            >
              {countdown > 0
                ? `${countdown} ${t('forget-password.submit-countdown')}`
                : t('forget-password.submit')}
            </Button>
          </div>

          <div className={styles.footer} onClick={() => setAction('LOGIN')}>
            {t('back-to-login-page')}
          </div>
        </div>
      );
    },
  ),
);