// import
import React, { useEffect, useContext } from 'react';
import { Form, Button, Input } from 'antd';

import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import { useRouter } from '@meepshop/link';
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
  const colors = useContext(ColorsContext);
  const role = useContext(RoleContext);
  const { push } = useRouter();
  const resetPassword = useResetPassword(token);
  const isGuest = role === 'GUEST';

  useEffect(() => {
    if (!isGuest) push('/');
  }, [isGuest, push]);

  return (
    <div className={styles.root}>
      <div>{t('title')}</div>

      <Form className={styles.form} onFinish={resetPassword}>
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} > div {
              background-color: ${colors[4]};
              color: ${colors[2]};
            }
          `,
        }}
      />
    </div>
  );
});
