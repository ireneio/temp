// typescript import
import { OptionsType } from './constants';

// import
import React, { useState, useContext } from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import { useValidateEmail } from '@meepshop/validator';

import useLogin from './hooks/useLogin';
import { SIGNUP, FORGET_PSW } from './constants';
import styles from './styles/loginForm.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(
  ({ setOptions }: { setOptions: (options: OptionsType) => void }) => {
    const { t } = useTranslation('login');
    const router = useRouter();
    const colors = useContext(ColorsContext);
    const { fb, isLoginEnabled } = useContext(FbContext);
    const validateEmail = useValidateEmail();
    const login = useLogin();
    const [fbLoginLoading, setFbLoginLoading] = useState<boolean>(false);

    return (
      <Form className={styles.root} onFinish={login}>
        <FormItem
          name={['email']}
          rules={[
            {
              required: true,
              message: t('email-is-required'),
            },
            {
              validator: validateEmail.validator,
            },
          ]}
          normalize={validateEmail.normalize}
          validateTrigger="onBlur"
        >
          <Input placeholder={t('email-placeholder')} size="large" />
        </FormItem>

        <FormItem
          name={['password']}
          rules={[
            {
              required: true,
              message: t('password-is-required'),
            },
          ]}
        >
          <Password placeholder={t('password-placeholder')} size="large" />
        </FormItem>

        <div className={styles.optionsWrapper}>
          <div onClick={() => setOptions(FORGET_PSW)}>
            {t('forget-password')}
          </div>

          <div onClick={() => setOptions(SIGNUP)}>{t('join-us')}</div>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            style={{
              borderColor: colors[4],
              backgroundColor: colors[4],
              color: colors[2],
            }}
            htmlType="submit"
            size="large"
          >
            {t('login')}
          </Button>

          {!isLoginEnabled ? null : (
            <Button
              className={styles.fbLoginButton}
              onClick={async () => {
                if (!fb || fbLoginLoading) return;

                setFbLoginLoading(true);
                await fb.login(window.storePreviousPageUrl || '/');
                setFbLoginLoading(false);
              }}
              size="large"
            >
              {t('fb-login')}
            </Button>
          )}

          <Button
            className={styles.goBackButton}
            style={{ borderColor: colors[5] }}
            onClick={() => router.push(window.storePreviousPageUrl || '/')}
            size="large"
          >
            {t('go-back')}
          </Button>
        </div>
      </Form>
    );
  },
);
