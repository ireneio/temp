// import
import React, { useContext } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import {
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { FbLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';

import styles from './styles/login.less';
import useLogin from './hooks/useLogin';
import useFbLogin from './hooks/useFbLogin';

// graphql typescript
import { getIsFbLoginEnabled as getIsFbLoginEnabledType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { getIsFbLoginEnabled } from './gqls/login';

// typescript definition
interface PropsType {
  onClose?: () => void;
  initialEmail: string;
  setIsForgetPassword: (isForgetPassword: boolean) => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(
  ({ onClose, initialEmail, setIsForgetPassword }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { isMobile } = useContext(SensorContext);
    const { t } = useTranslation('login-modal');
    const validateEmail = useValidateEmail();
    const { login, loading } = useLogin(onClose);
    const { fbLogin, loading: fbLoginLoading } = useFbLogin(onClose);
    const { data } = useQuery<getIsFbLoginEnabledType>(getIsFbLoginEnabled);
    const IsFbLoginEnabled =
      data?.viewer?.store?.facebookSetting.isLoginEnabled;

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
              size={isMobile ? 'large' : 'middle'}
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
            <Password
              size={isMobile ? 'large' : 'middle'}
              placeholder={t('password.placeholder')}
            />
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

        {!IsFbLoginEnabled ? null : (
          <>
            <Divider className={styles.or}>{t('member-login.or')}</Divider>
            <Button
              className={styles.fbLogin}
              size="large"
              onClick={fbLogin}
              loading={fbLoginLoading}
            >
              <FbLoginIcon />
              {t('member-login.fb-login')}
            </Button>
          </>
        )}

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

            .${styles.or}.ant-divider-with-text {
              color: ${colors[3]};
              border-top-color: ${colors[3]};
            }
          `,
          }}
        />
      </div>
    );
  },
);
