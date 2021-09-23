// import
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Divider } from 'antd';

import {
  Colors as ColorsContext,
  Sensor as SensorContext,
  Role as RoleContext,
  Fb as FbContext,
} from '@meepshop/context';
import { FbLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import { useRouter } from '@meepshop/link';

import styles from './styles/login.less';
import useLogin from './hooks/useLogin';

// typescript definition
interface PropsType {
  onClose?: () => void;
  initialEmail?: string;
  setIsForgetPassword: (isForgetPassword: boolean) => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(
  ({ onClose, initialEmail, setIsForgetPassword }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { isMobile } = useContext(SensorContext);
    const role = useContext(RoleContext);
    const dispatch = useDispatch();
    const { t } = useTranslation('login-modal');
    const { asPath } = useRouter();
    const validateEmail = useValidateEmail();
    const { login, loading } = useLogin();
    const { fb, isLoginEnabled: isFbLoginEnabled } = useContext(FbContext);
    const [fbLoginLoading, setFbLoginLoading] = useState(false);

    useEffect(() => {
      if (role === 'SHOPPER') {
        dispatch('CLEAN_PRODUCT');

        if (onClose) onClose();
      }
    }, [onClose, role, dispatch]);

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

        {!isFbLoginEnabled ? null : (
          <>
            <Divider className={styles.or}>{t('member-login.or')}</Divider>
            <Button
              className={styles.fbLogin}
              onClick={async () => {
                if (!fb) return;

                setFbLoginLoading(true);
                await fb.login(asPath);
                setFbLoginLoading(false);
              }}
              loading={fbLoginLoading}
              size="large"
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
