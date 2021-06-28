// import
import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useChangeUserPassword from './hooks/useChangeUserPassword';
import useValidateConfirmPassword from './hooks/useValidateConfirmPassword';
import styles from './styles/changePassword.less';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation('account-setting');
  const [form] = Form.useForm();
  const { changeUserPassword, closeModal } = useChangeUserPassword(
    form,
    setOpenModal,
  );
  const validateConfirmPassword = useValidateConfirmPassword();
  const { submit } = form;

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        {t('account.change-password')}
      </Button>

      <Modal
        className={styles.root}
        visible={openModal}
        title={t('account.change-password')}
        okText={t('account.confirm-change')}
        cancelText={t('cancel')}
        onOk={submit}
        onCancel={closeModal}
      >
        <Form form={form} onFinish={changeUserPassword}>
          <div>{t('account.current-password')}</div>
          <FormItem
            name={['currentPassword']}
            rules={[
              {
                required: true,
                message: t('account.required'),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Password />
          </FormItem>

          <div>{t('account.password.label')}</div>
          <FormItem
            name={['newPassword']}
            rules={[
              {
                required: true,
                message: t('account.required'),
              },
              {
                pattern: /^[A-Za-z0-9]{6,}$/,
                message: t('account.password.error'),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Password />
          </FormItem>

          <div>{t('account.confirm-password.label')}</div>
          <FormItem
            name={['confirmPassword']}
            rules={[
              {
                required: true,
                message: t('account.required'),
              },
              validateConfirmPassword,
            ]}
            dependencies={['newPassword']}
            validateTrigger="onBlur"
          >
            <Password />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});
