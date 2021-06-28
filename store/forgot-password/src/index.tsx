// import
import React from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useResetPassword from './hooks/useResetPassword';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  token: string;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(({ token }: PropsType) => {
  const { t } = useTranslation('forgot-password');
  const resetPassword = useResetPassword(token);

  return (
    <Form className={styles.root} onFinish={resetPassword}>
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

      <Button htmlType="submit" size="large">
        {t('reset-password')}
      </Button>
    </Form>
  );
});
