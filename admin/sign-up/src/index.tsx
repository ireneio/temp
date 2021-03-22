// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// graphql typescript
import {
  isMerchantEmailUsable,
  isMerchantEmailUsableVariables,
} from '@meepshop/types/gqls/admin';

// import
import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Button, Icon } from 'antd';

import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { loginLogo, loginBackground } from '@meepshop/images';
import { useValidateEmail } from '@meepshop/validator';

import useApplyForStore from './hooks/useApplyForStore';

import styles from './styles/index.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SignUp: NextPage = Form.create<FormComponentProps>()(
  React.memo(
    ({
      form,
      form: { getFieldDecorator, getFieldValue },
    }: FormComponentProps) => {
      const client = useApolloClient();
      const { t } = useTranslation('sign-up');
      const {
        loading,
        isApplyForStoreCompleted,
        applyForStore,
      } = useApplyForStore(form);
      const validateEmail = useValidateEmail();

      return (
        <div
          className={styles.root}
          style={{ backgroundImage: `url('${loginBackground}')` }}
        >
          {!isApplyForStoreCompleted ? (
            <div className={styles.signUp}>
              <div className={styles.wrapper}>
                <img src={loginLogo} alt="Meepshop" />

                <div>{t('free-trial')}</div>

                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: t('account.error'),
                      },
                      {
                        validator: validateEmail.validator,
                      },
                      {
                        validator: async (_, email, callback) => {
                          const {
                            data: {
                              isMerchantEmailUsable: { result },
                            },
                          } = await client.query<
                            isMerchantEmailUsable,
                            isMerchantEmailUsableVariables
                          >({
                            query: gql`
                              query isMerchantEmailUsable($email: String!) {
                                isMerchantEmailUsable(email: $email) {
                                  result
                                }
                              }
                            `,
                            variables: { email },
                          });

                          if (result === 'ALREADY_USED')
                            callback(t('account.email-has-been-used'));
                          else if (result === 'INVALID_FORMAT')
                            callback(t('account.error'));
                          else callback();
                        },
                      },
                    ],
                    validateFirst: true,
                    validateTrigger: 'onBlur',
                    normalize: validateEmail.normalize,
                  })(
                    <Input
                      placeholder={t('account.placeholder')}
                      size="large"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: t('password.error'),
                      },
                      {
                        pattern: /^[A-Za-z0-9]{6,}$/,
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

                <FormItem>
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        validator: (_, value, callback) => {
                          if (value !== getFieldValue('password'))
                            callback(t('confirm-password.error'));
                          else callback();
                        },
                      },
                    ],
                    validateTrigger: 'onBlur',
                  })(
                    <Password
                      placeholder={t('confirm-password.placeholder')}
                      size="large"
                    />,
                  )}
                </FormItem>

                <Button
                  loading={loading}
                  type="primary"
                  size="large"
                  onClick={applyForStore}
                >
                  {t('sign-up-now')}
                </Button>

                <span>
                  {t('agree')}
                  <a
                    href="https://www.meepshop.com/terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('service-policy')}
                  </a>
                  {t('and')}
                  <a
                    href="https://www.meepshop.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('privacy-policy')}
                  </a>
                </span>
              </div>

              <div className={styles.footer}>
                {t('had-store')}

                <Link href="/login">
                  <a href="/login">{t('go-to-login')}</a>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.response}>
              <Icon type="check-circle" />

              <div>{t('sign-up-success')}</div>
              <div>
                {t('email-has-been-sent-1')}
                {getFieldValue('email')}
                {t('email-has-been-sent-2')}
              </div>

              <Link href="/login">
                <Button type="primary" size="large">
                  {t('back-to-login-page')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      );
    },
  ),
);

SignUp.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SignUp;
