// import
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';

import LoginFooter from './LoginFooter';
import styles from './styles/login.less';
import useLogin from './hooks/useLogin';

// typescript definition
interface PropsType {
  onClose?: () => void;
  disableThirdPartyLogin?: boolean;
  initialEmail?: string;
  setIsForgetPassword: (isForgetPassword: boolean) => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(
  ({
    onClose,
    disableThirdPartyLogin,
    initialEmail,
    setIsForgetPassword,
  }: PropsType) => {
    const colors = useContext(ColorsContext);
    const role = useContext(RoleContext);
    const { t } = useTranslation('login-modal');
    const validateEmail = useValidateEmail();
    const { login, loading } = useLogin();

    useEffect(() => {
      if (role === 'SHOPPER' && onClose) onClose();
    }, [onClose, role]);

    return (
      <div className={styles.root}>
        <Form onFinish={login}>
          <FormItem
            name={['email']}
            rules={[
              {
                required: true,
                message: t('email.required'),
              },
              {
                validator: validateEmail.validator,
              },
            ]}
            normalize={validateEmail.normalize}
            initialValue={initialEmail}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input
              type="email"
              size="large"
              placeholder={t('email.placeholder')}
            />
          </FormItem>

          <FormItem
            name={['password']}
            rules={[
              {
                required: true,
                message: t('password.required'),
              },
            ]}
          >
            <Password size="large" placeholder={t('password.placeholder')} />
          </FormItem>

          <div className={styles.forget}>
            <span onClick={() => setIsForgetPassword(true)}>
              {t('member-login.forget-password')}
            </span>
          </div>

          <FormItem>
            <Button
              className={styles.login}
              htmlType="submit"
              size="large"
              loading={loading}
            >
              {t('member-login.submit')}
            </Button>
          </FormItem>
        </Form>

        <LoginFooter disableThirdPartyLogin={disableThirdPartyLogin} />

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.forget} {
              color: ${colors[3]};
            }

            .${styles.login},
            .${styles.login}:active,
            .${styles.login}:hover,
            .${styles.login}:focus {
              color: ${colors[2]};
              border-color: ${colors[4]};
              background: ${colors[4]};
            }
          `,
          }}
        />
      </div>
    );
  },
);
