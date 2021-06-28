// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { meepshopLogo, loginBackground } from '@meepshop/images';
import { useRouter } from '@meepshop/link';

import useValidateConfirmPassword from './hooks/useValidateConfirmPassword';
import useSetUserPasswordByToken from './hooks/useSetUserPasswordByToken';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

const ResetPassword: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('reset-password');
  const router = useRouter();
  const validateConfirmPassword = useValidateConfirmPassword();
  const {
    loading,
    response,
    setUserPasswordByToken,
  } = useSetUserPasswordByToken();

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url('${loginBackground}')` }}
    >
      {!response ? (
        <Form onFinish={setUserPasswordByToken}>
          <img src={meepshopLogo} alt="meepshop" />

          <div>{t('set-password')}</div>

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
            {t('submit-password')}
          </Button>
        </Form>
      ) : (
        <div className={styles.response}>
          {response === 'SUCCESS' ? (
            <>
              <CheckCircleOutlined />
              <div>{t('success.title')}</div>
              <div>{t('success.description')}</div>
            </>
          ) : (
            <>
              <ExclamationCircleOutlined />
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
});

ResetPassword.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default ResetPassword;
