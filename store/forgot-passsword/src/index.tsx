// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Button, Form, Input } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends I18nPropsType, FormComponentProps {
  token: string;
  // TODO: remove after removing redux
  dispatchAction: (dispatchName: string, data: unknown) => void;
}

// definition
const ForgotPassword = React.memo(
  ({
    // HOC
    t,
    form,

    // props
    token,
    dispatchAction,
  }: PropsType) => {
    const { validateFields, getFieldDecorator } = form;

    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();

      validateFields((err, values) => {
        if (!err) {
          const { password } = values;

          dispatchAction('resetPassword', { password, token });
        }
      });
    };

    return (
      <Form className={styles.wrapper} onSubmit={handleSubmit}>
        <h3>{t('forget-password')}</h3>
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
        <Form.Item>
          <Button htmlType="submit" size="large">
            {t('reset-password')}
          </Button>
        </Form.Item>
      </Form>
    );
  },
);

export default Form.create<PropsType>()(
  withTranslation('forgot-password')(ForgotPassword),
);
