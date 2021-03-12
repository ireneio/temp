// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Modal, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useChangeUserPassword from './hooks/useChangeUserPassword';

import styles from './styles/changePassword.less';

// typescript definition
interface PropsType extends FormComponentProps {
  openModal: boolean;
  setOpenModal: (status: boolean) => void;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default Form.create<PropsType>()(
  React.memo(
    ({
      form,
      form: { getFieldDecorator, getFieldValue },
      openModal,
      setOpenModal,
    }: PropsType) => {
      const { t } = useTranslation('account-setting');
      const { changeUserPassword, closeModal } = useChangeUserPassword(
        form,
        setOpenModal,
      );

      return (
        <Modal
          className={styles.root}
          visible={openModal}
          title={t('account.change-password')}
          okText={t('account.confirm-change')}
          cancelText={t('cancel')}
          onOk={changeUserPassword}
          onCancel={closeModal}
        >
          <>
            <div>{t('account.current-password')}</div>
            <FormItem>
              {getFieldDecorator('currentPassword', {
                rules: [
                  {
                    required: true,
                    message: t('account.required'),
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Password />)}
            </FormItem>

            <div>{t('account.password.label')}</div>
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: t('account.password.error'),
                  },
                  {
                    pattern: /^[A-Za-z0-9]{6,}$/,
                    message: t('account.password.error'),
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Password />)}
            </FormItem>

            <div>{t('account.confirm-password.label')}</div>
            <FormItem>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    validator: (_, value, callback) => {
                      if (value !== getFieldValue('newPassword'))
                        callback(t('account.confirm-password.error'));
                      else callback();
                    },
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Password />)}
            </FormItem>
          </>
        </Modal>
      );
    },
  ),
);
