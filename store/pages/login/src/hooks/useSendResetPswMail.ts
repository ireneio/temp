// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UserTypeEnum as UserTypeEnumType,
  sendResetPasswordEmail as sendResetPasswordEmailType,
  sendResetPasswordEmailVariables as sendResetPasswordEmailVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { sendResetPasswordEmail } from '../gqls/useSendResetPswMail';

// definition
export default (cname: string): (({ email }: { email: string }) => void) => {
  const { t } = useTranslation('login');
  const [mutation] = useMutation<
    sendResetPasswordEmailType,
    sendResetPasswordEmailVariablesType
  >(sendResetPasswordEmail, {
    onCompleted: data => {
      switch (data.sendResetPasswordEmail.status) {
        case 'OK':
          notification.success({
            message: t('forget-password-success'),
          });
          break;

        case 'FAIL_CANNOT_FIND_USER':
          notification.error({
            message: t('forget-password-failure-message'),
            description: t('cannot-find-user'),
          });
          break;

        default:
          notification.error({
            message: t('forget-password-failure-message'),
            description: data.sendResetPasswordEmail.status,
          });
          break;
      }
    },
  });

  return useCallback(
    ({ email }) => {
      mutation({
        variables: {
          input: {
            cname,
            email,
            type: 'SHOPPER' as UserTypeEnumType,
          },
        },
      });
    },
    [cname, mutation],
  );
};
