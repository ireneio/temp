// import
import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import Script from 'next/script';

import Email from '@meepshop/form-email';
import { useTranslation } from '@meepshop/locales';
import { loginLogo } from '@meepshop/images';

import useGrecaptcha from './hooks/useGrecaptcha';
import useLogin from './hooks/useLogin';

import styles from './styles/login.less';

// typescript definition
interface PropsType {
  setAction: (input: 'LOGIN' | 'FORGET_PASSWORD') => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(({ setAction }: PropsType) => {
  const { t } = useTranslation('login');
  const { grecaptcha, grecaptchaRef, onLoad } = useGrecaptcha();
  const { loading, login } = useLogin(grecaptcha);

  return (
    <>
      <Script
        id="recaptcha-js"
        strategy="lazyOnload"
        src="https://www.google.com/recaptcha/api.js"
        onLoad={onLoad}
      />

      <div className={styles.root}>
        <Form onFinish={login}>
          <img src={loginLogo} alt="Meepshop" />

          <h1>{t('title')}</h1>

          <Email name={['email']} isNotShopper />

          <FormItem
            name={['password']}
            rules={[
              {
                required: true,
                message: t('password.error'),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Password placeholder={t('password.placeholder')} size="large" />
          </FormItem>

          <div className={styles.helper}>
            <FormItem
              name={['isHelper']}
              initialValue={false}
              valuePropName="checked"
            >
              <Checkbox>{t('helper.placeholder')}</Checkbox>
            </FormItem>

            <FormItem dependencies={['isHelper']} noStyle>
              {({ getFieldValue }) =>
                !getFieldValue(['isHelper']) ? null : (
                  <FormItem
                    name={['cname']}
                    rules={[
                      {
                        required: true,
                        message: t('cname.error'),
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input placeholder={t('cname.placeholder')} size="large" />
                  </FormItem>
                )
              }
            </FormItem>
          </div>

          <div className={styles.recaptcha} ref={grecaptchaRef} />

          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            size="large"
          >
            {t('login')}
          </Button>
        </Form>

        <div className={styles.footer}>
          {t('not-yet-register')}

          <a
            href="https://meepshop.com/consultant-reservation"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('get-registered')}
          </a>

          {/* FIXME: when /sign-up is officially online
            <Link href="/sign-up">
              <a href="/sign-up">{t('sign-up-now')}</a>
            </Link> */}

          <span onClick={() => setAction('FORGET_PASSWORD')}>
            {t('forget-password.title')}
          </span>
        </div>
      </div>
    </>
  );
});
