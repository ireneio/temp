// typescript import
import { FormComponentProps } from 'antd/lib/form';

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

// definition
export default ({
  validateFields,
  resetFields,
}: FormComponentProps['form']): ((e: React.FormEvent<HTMLElement>) => void) => {
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
    e => {
      e.preventDefault();

      validateFields((err, { currentPassword, newPassword }) => {
        if (err) return;

        mutation({
          variables: {
            input: {
              currentPassword,
              newPassword,
            },
          },
        });
      });
    },
    [mutation, validateFields],
  );
};
