// import
import React, { useContext } from 'react';
import { Form, Button } from 'antd';

import Email from '@meepshop/form-email';
import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/forgetPassword.less';
import useForgetPassword from './hooks/useForgetPassword';

// typescript definition
interface PropsType {
  initialEmail?: string;
  setIsForgetPassword: (isForgetPassword: boolean) => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ initialEmail, setIsForgetPassword }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { t } = useTranslation('login-modal');
    const { forgetPassword, loading } = useForgetPassword(setIsForgetPassword);

    return (
      <Form className={styles.root} onFinish={forgetPassword}>
        <div className={styles.description}>
          {t('forget-password.description')}
        </div>

        <Email
          name={['email']}
          initialValue={initialEmail}
          label={t('forget-password.email')}
          labelCol={{ span: 24 }}
          placeholder={t('forget-password.placeholder')}
        />

        <FormItem>
          <Button
            className={styles.button}
            htmlType="submit"
            size="large"
            loading={loading}
          >
            {t('forget-password.submit')}
          </Button>
        </FormItem>

        <div className={styles.back}>
          <span onClick={() => setIsForgetPassword(false)}>
            {t('forget-password.back')}
          </span>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root},
              .${styles.root} .ant-form-item-required {
                color: ${colors[3]};
              }

              .${styles.button},
              .${styles.button}:active,
              .${styles.button}:hover,
              .${styles.button}:focus {
                color: ${colors[2]};
                border-color: ${colors[4]};
                background: ${colors[4]};
              }
            `,
          }}
        />
      </Form>
    );
  },
);
