// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  changeUserPassword as changeUserPasswordType,
  changeUserPasswordVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { changeUserPassword } from '../gqls/useChangeUserPassword';

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

  const [mutation] = useMutation<
    changeUserPasswordType,
    changeUserPasswordVariables
  >(changeUserPassword, {
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
  });

  return {
    changeUserPassword: useCallback(
      e => {
        e.preventDefault();

        validateFields((errors, { currentPassword, newPassword }) => {
          if (!errors) {
            mutation({
              variables: { input: { currentPassword, newPassword } },
            });
          }
        });
      },
      [validateFields, mutation],
    ),
    closeModal,
  };
};
