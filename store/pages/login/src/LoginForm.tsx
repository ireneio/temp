// typescript import
import { OptionsType } from './constants';

// import
import React, { useState, useContext } from 'react';
import { Form, Button, Input, Divider } from 'antd';
import { filter } from 'graphql-anywhere';

import Line from '@meepshop/line';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import { useValidateEmail } from '@meepshop/validator';
import { FbLoginIcon } from '@meepshop/icons';
import { useRouter } from '@meepshop/link';

import useLogin from './hooks/useLogin';
import { SIGNUP, FORGET_PSW } from './constants';
import styles from './styles/loginForm.less';

// graphql typescript
import { loginFormFragment as loginFormFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

// typescript definition
interface PropsType {
  lineLoginSetting: loginFormFragmentType | null;
  setOptions: (options: OptionsType) => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(({ setOptions, lineLoginSetting }: PropsType) => {
  const { t } = useTranslation('login');
  const colors = useContext(ColorsContext);
  const { fb, isLoginEnabled: fbLoginEnable } = useContext(FbContext);
  const { previousUrl } = useRouter();
  const validateEmail = useValidateEmail();
  const login = useLogin();
  const [fbLoginLoading, setFbLoginLoading] = useState<boolean>(false);
  const lineLoginEnable = lineLoginSetting?.isLoginEnabled || null;

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
        <div onClick={() => setOptions(FORGET_PSW)}>{t('forget-password')}</div>

        <div onClick={() => setOptions(SIGNUP)}>{t('join-us')}</div>
      </div>

      <Button
        style={{
          borderColor: colors[4],
          backgroundColor: colors[4],
          color: colors[2],
        }}
        className={styles.login}
        htmlType="submit"
        size="large"
      >
        {t('login')}
      </Button>

      {fbLoginEnable || lineLoginEnable ? (
        <>
          <Divider className={styles.divider}>{t('or')}</Divider>

          <div className={styles.buttonGroup}>
            {!fbLoginEnable ? null : (
              <Button
                className={styles.fbLoginButton}
                icon={<FbLoginIcon />}
                onClick={async () => {
                  if (!fb || fbLoginLoading) return;

                  setFbLoginLoading(true);
                  await fb.login(previousUrl);
                  setFbLoginLoading(false);
                }}
                size="large"
              >
                {t('fb-login')}
              </Button>
            )}

            <Line
              className={styles.lineLoginButton}
              size="large"
              redirectUrl={previousUrl}
              lineLoginSetting={filter(lineFragment, lineLoginSetting)}
            />
          </div>
        </>
      ) : null}
    </Form>
  );
});
