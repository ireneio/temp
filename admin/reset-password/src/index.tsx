// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Input, Button, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import getImage, { meepshopLogo } from '@meepshop/images';
import { useRouter } from '@admin/link';

import useSetUserPasswordByToken from './hooks/useSetUserPasswordByToken';

import styles from './styles/index.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

const ResetPasswordWrapper = Form.create<FormComponentProps>()(
  React.memo(
    ({
      form: { getFieldDecorator, getFieldValue, validateFields },
    }: FormComponentProps) => {
      const { t } = useTranslation('reset-password');
      const router = useRouter();
      const {
        loading,
        response,
        setUserPasswordByToken,
      } = useSetUserPasswordByToken();

      return (
        <div className={styles.root}>
          {!response ? (
            <div className={styles.wrapper}>
              <img src={getImage(meepshopLogo)} alt="meepshop" />
              <div>{t('set-password')}</div>

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
                onClick={() => {
                  validateFields((errors, { password }) => {
                    if (!errors) {
                      setUserPasswordByToken({
                        input: {
                          token: router.query.token as string,
                          password,
                        },
                      });
                    }
                  });
                }}
              >
                {t('submit-password')}
              </Button>
            </div>
          ) : (
            <div className={styles.response}>
              {response === 'SUCCESS' ? (
                <>
                  <Icon type="check-circle" />
                  <div>{t('success.title')}</div>
                  <div>{t('success.description')}</div>
                </>
              ) : (
                <>
                  <Icon type="exclamation-circle" />
                  <div>{t('fail.title')}</div>
                  <div>{t('fail.description')}</div>
                </>
              )}

              <Button
                type="primary"
                size="large"
                onClick={() => router.push('/login')}
              >
                {t('back-to-login-page')}
              </Button>
            </div>
          )}
        </div>
      );
    },
  ),
);

const ResetPassword: NextPage = React.memo(
  (): React.ReactElement => <ResetPasswordWrapper />,
);

ResetPassword.getInitialProps = async () => ({
  namespacesRequired: ['reset-password'],
});

export default ResetPassword;
