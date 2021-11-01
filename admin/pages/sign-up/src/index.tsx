// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { loginLogo, loginBackground } from '@meepshop/images';
import { useValidateEmail } from '@meepshop/validator';

import useApplyForStore from './hooks/useApplyForStore';
import useValidateConfirmPassword from './hooks/useValidateConfirmPassword';
import useValidateMerchantEmail from './hooks/useValidateMerchantEmail';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: boolean;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

const SignUp: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('sign-up');
  const {
    loading,
    isApplyForStoreCompleted,
    applyForStore,
  } = useApplyForStore();
  const validateEmail = useValidateEmail(true);
  const validateConfirmPassword = useValidateConfirmPassword();
  const validateMerchantEmail = useValidateMerchantEmail();

  return (
    <Form
      className={styles.root}
      style={{ backgroundImage: `url('${loginBackground}')` }}
      onFinish={applyForStore}
    >
      {!isApplyForStoreCompleted ? (
        <div className={styles.signUp}>
          <div className={styles.wrapper}>
            <img src={loginLogo} alt="Meepshop" />

            <div>{t('free-trial')}</div>

            <FormItem
              name={['email']}
              rules={[
                {
                  required: true,
                  message: t('account.error'),
                },
                {
                  validator: validateEmail.validator,
                },
                {
                  validator: validateMerchantEmail,
                },
              ]}
              normalize={validateEmail.normalize}
              validateTrigger="onBlur"
              validateFirst
            >
              <Input placeholder={t('account.placeholder')} size="large" />
            </FormItem>

            <FormItem
              name={['password']}
              rules={[
                {
                  required: true,
                  message: t('password.error'),
                },
                {
                  pattern: /^[A-Za-z0-9]{6,}$/,
                  message: t('password.error'),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Password placeholder={t('password.placeholder')} size="large" />
            </FormItem>

            <FormItem
              name={['confirmPassword']}
              rules={[
                {
                  required: true,
                  message: t('password.error'),
                },
                validateConfirmPassword,
              ]}
              dependencies={['password']}
              validateTrigger="onBlur"
            >
              <Password
                placeholder={t('confirm-password.placeholder')}
                size="large"
              />
            </FormItem>

            <Button
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
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
          <CheckCircleOutlined />

          <div>{t('sign-up-success')}</div>

          <div>
            <FormItem dependencies={['email']} noStyle>
              {({ getFieldValue }) =>
                t('email-has-been-sent', { email: getFieldValue(['email']) })
              }
            </FormItem>
          </div>

          <Link href="/login">
            <Button type="primary" size="large">
              {t('back-to-login-page')}
            </Button>
          </Link>
        </div>
      )}
    </Form>
  );
});

SignUp.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default SignUp;
