// import
import React, { useContext } from 'react';
import { Form, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import Email from '@meepshop/form-email';

import useSendResetPswMail from './hooks/useSendResetPswMail';
import styles from './styles/sendResetPswMailForm.less';

// graphql typescript
import { sendResetPswMailFormFragment as sendResetPswMailFormFragmentType } from '@meepshop/types/gqls/store';

// definition
export default React.memo(
  ({ store }: { store: sendResetPswMailFormFragmentType | null }) => {
    const { t } = useTranslation('login');
    const colors = useContext(ColorsContext);
    const sendResetPswMail = useSendResetPswMail(store?.cname || '');

    return (
      <Form onFinish={sendResetPswMail}>
        <Email name={['email']} />

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
