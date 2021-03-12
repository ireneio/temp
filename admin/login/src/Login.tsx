// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

// import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { loginLogo } from '@meepshop/images';
import { useValidateEmail } from '@meepshop/validator';

import useGrecaptcha from './hooks/useGrecaptcha';
import useLogin from './hooks/useLogin';

import styles from './styles/login.less';

// typescript definition
interface PropsType extends FormComponentProps {
  setAction: (input: 'LOGIN' | 'FORGET_PASSWORD') => void;
}

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
      const validateEmail = useValidateEmail();

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
                      message: t('required'),
                    },
                    {
                      validator: validateEmail.validator,
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

              {/* FIXME: when /sign-up is officially online
              <Link href="/sign-up">
                <a href="/sign-up">{t('sign-up-now')}</a>
              </Link> */}

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
