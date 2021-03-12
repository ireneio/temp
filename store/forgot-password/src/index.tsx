// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Button, Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useResetPassword from './hooks/useResetPassword';
import styles from './styles/index.less';

// typescript definition
interface PropsType extends FormComponentProps {
  token: string;
}

// definition
export default Form.create<PropsType>()(
  React.memo(({ form, token }: PropsType) => {
    const { t } = useTranslation('forgot-password');
    const resetPassword = useResetPassword(token, form);
    const { getFieldDecorator } = form;

    return (
      <Form className={styles.root} onSubmit={resetPassword}>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: t('password-is-required'),
              },
            ],
          })(
            <Input.Password
              placeholder={t('password-placeholder')}
              size="large"
            />,
          )}
        </Form.Item>

        <Button htmlType="submit" size="large">
          {t('reset-password')}
        </Button>
      </Form>
    );
  }),
);
