// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { notification } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  changeUserPassword as changeUserPasswordType,
  changeUserPasswordVariables as changeUserPasswordVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { changeUserPassword } from '../gqls/useMemberChangePassword';

// typescript interface
export interface ValuesType {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}

// definition
export default ({
  resetFields,
}: FormInstance): ((values: ValuesType) => void) => {
  const { t } = useTranslation('member-password-change');
  const [mutation] = useMutation<
    changeUserPasswordType,
    changeUserPasswordVariablesType
  >(changeUserPassword, {
    onCompleted: (data: changeUserPasswordType) => {
      if (data.changeUserPassword.status !== 'OK') {
        notification.error({
          message: t('error'),
        });
        return;
      }

      notification.success({
        message: t('success'),
      });
      resetFields();
    },
  });

  return useCallback(
    ({ confirmPassword: _, ...input }) => {
      mutation({
        variables: {
          input,
        },
      });
    },
    [mutation],
  );
};
