// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';

import useGrecaptcha from './hooks/useGrecaptcha';
import useFormSubmit from './hooks/useFormSubmit';
import styles from './styles/index.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

/** TODO: remove LoginWrapper after antd >= 4.0.0 */
const LoginWrapper = Form.create<FormComponentProps>()(
  React.memo(
    ({
      form: { getFieldDecorator, getFieldValue, validateFields },
    }: FormComponentProps) => {
      const { t } = useTranslation('login');
      const { grecaptchaRef, grecaptchaScript } = useGrecaptcha();
      const { loading, onSubmit } = useFormSubmit(validateFields);

      return (
        <>
          <Head>{grecaptchaScript}</Head>

          <div className={styles.root}>
            <Form onSubmit={onSubmit}>
              <img src="/images/login/logo.gif" alt="Meepshop" />

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

              <FormItem>
                <div ref={grecaptchaRef} />
              </FormItem>

              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                size="large"
              >
                {t('login')}
              </Button>

              <div className={styles.notYetRegister}>
                {t('not-yet-register')}

                <a
                  href="https://meepshop.com/consultant-reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('get-registered')}
                </a>
              </div>
            </Form>
          </div>
        </>
      );
    },
  ),
);

const Login = (): React.ReactElement => <LoginWrapper />;

Login.getInitialProps = () => ({
  namespacesRequired: ['login'],
});

export default Login;
