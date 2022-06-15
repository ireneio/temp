// typescript import
import { OptionsType } from './constants';

// import
import React, { useState, useContext } from 'react';
import { Form, Button, Input, Divider } from 'antd';

import Line from '@meepshop/line';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import { FbLoginIcon } from '@meepshop/icons';
import Email from '@meepshop/form-email';
import { useRouter } from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';

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
  const login = useLogin();
  const [fbLoginLoading, setFbLoginLoading] = useState<boolean>(false);
  const lineLoginEnable = lineLoginSetting?.isLoginEnabled || null;

  return (
    <Form className={styles.root} onFinish={login}>
      <Email name={['email']} />

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
