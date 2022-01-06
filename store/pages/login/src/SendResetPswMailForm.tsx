// import
import React, { useContext } from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import { useValidateEmail } from '@meepshop/validator';

import useSendResetPswMail from './hooks/useSendResetPswMail';
import styles from './styles/sendResetPswMailForm.less';

// graphql typescript
import { sendResetPswMailFormFragment as sendResetPswMailFormFragmentType } from '@meepshop/types/gqls/store';

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ store }: { store: sendResetPswMailFormFragmentType | null }) => {
    const { t } = useTranslation('login');
    const colors = useContext(ColorsContext);
    const validateEmail = useValidateEmail(true);
    const sendResetPswMail = useSendResetPswMail(store?.cname || '');

    return (
      <Form onFinish={sendResetPswMail}>
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
            {t('send-reset-password-mail')}
          </Button>
        </div>
      </Form>
    );
  },
);
