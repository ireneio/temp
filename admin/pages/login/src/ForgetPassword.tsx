// import
import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import Email from '@meepshop/form-email';
import { useTranslation } from '@meepshop/locales';
import { meepshopLogo } from '@meepshop/images';

import useSendResetPasswordEmail from './hooks/useSendResetPasswordEmail';

import styles from './styles/forgetPassword.less';

// typescript definition
interface PropsType {
  setAction: (input: 'LOGIN' | 'FORGET_PASSWORD') => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ setAction }: PropsType) => {
  const { t } = useTranslation('login');
  const {
    loading,
    countdown,
    sendResetPasswordEmail,
  } = useSendResetPasswordEmail();

  return (
    <Form className={styles.root} onFinish={sendResetPasswordEmail}>
      <div className={styles.wrapper}>
        <img src={meepshopLogo} alt="meepshop" />
        <div>{t('forget-password.title')}</div>
        <div>{t('forget-password.description')}</div>

        <FormItem
          className={styles.helper}
          name={['isHelper']}
          initialValue={false}
          valuePropName="checked"
        >
          <Checkbox>{t('helper.is-helper')}</Checkbox>
        </FormItem>

        <Email name={['email']} isNotShopper />

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

        <Button
          loading={loading}
          disabled={countdown > 0}
          type="primary"
          htmlType="submit"
          size="large"
        >
          {countdown > 0
            ? `${countdown} ${t('forget-password.submit-countdown')}`
            : t('forget-password.submit')}
        </Button>
      </div>

      <div className={styles.footer} onClick={() => setAction('LOGIN')}>
        {t('back-to-login-page')}
      </div>
    </Form>
  );
});
