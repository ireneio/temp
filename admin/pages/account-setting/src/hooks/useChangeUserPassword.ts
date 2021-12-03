// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  changeUserPassword as changeUserPasswordType,
  changeUserPasswordVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { changeUserPassword } from '../gqls/useChangeUserPassword';

// typescript definition
export interface ValuesType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// definition
export default (
  { resetFields }: FormInstance,
  setOpenModal: (value: boolean) => void,
): {
  changeUserPassword: (values: ValuesType) => void;
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
      ({ confirmPassword: _, ...input }) => {
        mutation({
          variables: { input },
        });
      },
      [mutation],
    ),
    closeModal,
  };
};
