// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { changeUserPassword as changeUserPasswordType } from './__generated__/changeUserPassword';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  setOpenModal: (value: boolean) => void,
): {
  changeUserPassword: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeModal: () => void;
} => {
  const { t } = useTranslation('account-setting');

  const closeModal = useCallback(() => {
    resetFields();
    setOpenModal(false);
  }, [resetFields, setOpenModal]);

  const [changeUserPassword] = useMutation<changeUserPasswordType>(
    gql`
      mutation changeUserPassword($input: ChangeUserPasswordInput) {
        changeUserPassword(input: $input) {
          status
        }
      }
    `,
    {
      onCompleted: data => {
        const status = data?.changeUserPassword?.status;

        switch (status) {
          case 'OK': {
            closeModal();
            message.success(t('account.update-password-success'));
            break;
          }
          case 'FAIL_USER_NOT_FOUND':
            message.error(t('account.user-not-found'));
            break;
          case 'FAIL_INCORRECT_CURRENT_PASSWORD':
            message.error(t('account.incorrect-current-password'));
            break;
          default:
            message.error(t('account.update-password-fail'));
            break;
        }
      },
    },
  );

  return {
    changeUserPassword: useCallback(
      e => {
        e.preventDefault();

        validateFields((errors, { currentPassword, newPassword }) => {
          if (!errors) {
            changeUserPassword({
              variables: { input: { currentPassword, newPassword } },
            });
          }
        });
      },
      [validateFields, changeUserPassword],
    ),
    closeModal,
  };
};
