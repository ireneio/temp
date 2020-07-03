// typescript import
import { PropsType } from './index';

// import
import React from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { loginLogo } from '@meepshop/images';

import useGrecaptcha from './hooks/useGrecaptcha';
import useLogin from './hooks/useLogin';

import styles from './styles/login.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default Form.create<PropsType>()(
  React.memo(
    ({
      setAction,
      form: { getFieldDecorator, getFieldValue, validateFields },
    }: PropsType) => {
      const { t } = useTranslation('login');
      const { grecaptchaRef, grecaptchaScript } = useGrecaptcha();
      const { loading, onSubmit } = useLogin(validateFields);

      return (
        <>
          <Head>{grecaptchaScript}</Head>

          <div className={styles.root}>
            <Form onSubmit={onSubmit}>
              <img src={loginLogo} alt="Meepshop" />

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

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: t('password.error'),
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Password
                    placeholder={t('password.placeholder')}
                    size="large"
                  />,
                )}
              </FormItem>

              <div className={styles.helper}>
                <FormItem>
                  {getFieldDecorator('isHelper', {
                    valuePropName: 'checked',
                    initialValue: false,
                  })(<Checkbox>{t('helper.placeholder')}</Checkbox>)}
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
                    })(
                      <Input
                        placeholder={t('cname.placeholder')}
                        size="large"
                      />,
                    )}
                  </FormItem>
                )}
              </div>

              <div className={styles.recaptcha} ref={grecaptchaRef} />

              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                size="large"
              >
                {t('login')}
              </Button>
            </Form>

            <div className={styles.footer}>
              {t('not-yet-register')}

              <a
                href="https://meepshop.com/consultant-reservation"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('get-registered')}
              </a>

              <span onClick={() => setAction('FORGET_PASSWORD')}>
                {t('forget-password.title')}
              </span>
            </div>
          </div>
        </>
      );
    },
  ),
);