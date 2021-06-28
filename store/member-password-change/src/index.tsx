// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import useMemberChangePassword from './hooks/useMemberChangePassword';
import useValidateConfirmPassword from './hooks/useValidateConfirmPassword';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

const MemberPasswordChange: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('member-password-change');
  const colors = useContext(ColorsContext);
  const [form] = Form.useForm();
  const memberChangePassword = useMemberChangePassword(form);
  const validateConfirmPassword = useValidateConfirmPassword();

  return (
    <Form className={styles.root} form={form} onFinish={memberChangePassword}>
      <FormItem
        name={['currentPassword']}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
        ]}
        validateTrigger="onBlur"
      >
        <Password size="large" placeholder={t('current-password')} />
      </FormItem>

      <FormItem
        name={['newPassword']}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
        ]}
        validateTrigger="onBlur"
      >
        <Password size="large" placeholder={t('new-password')} />
      </FormItem>

      <FormItem
        name={['confirmPassword']}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
          validateConfirmPassword,
        ]}
        dependencies={['newPassword']}
        validateTrigger="onBlur"
      >
        <Password size="large" placeholder={t('confirm-password')} />
      </FormItem>

      <FormItem shouldUpdate noStyle>
        {({ getFieldsError }) => (
          <Button
            className={styles.button}
            style={{
              color: colors[3],
              borderColor: colors[3],
            }}
            disabled={getFieldsError().some(
              ({ errors }) => errors.length !== 0,
            )}
            size="large"
            type="primary"
            htmlType="submit"
          >
            {t('submit')}
          </Button>
        )}
      </FormItem>
    </Form>
  );
});

MemberPasswordChange.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default MemberPasswordChange;
