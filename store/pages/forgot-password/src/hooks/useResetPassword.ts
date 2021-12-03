// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  resetPassword as resetPasswordType,
  resetPasswordVariables as resetPasswordVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { resetPassword } from '../gqls/useResetPassword';

// typescript definition
interface ValuesType {
  password: string;
}

// definition
export default (token: string): ((values: ValuesType) => void) => {
  const { t } = useTranslation('forgot-password');
  const router = useRouter();
  const [mutation] = useMutation<resetPasswordType, resetPasswordVariablesType>(
    resetPassword,
    {
      onCompleted: (data: resetPasswordType) => {
        switch (data.setUserPasswordByToken.status) {
          case 'SUCCESS':
            notification.success({
              message: t('success'),
            });
            router.push('/login');
            break;
          case 'FAIL_TOKEN_TIMEOUT':
          case 'FAIL_TOKEN_NOT_FOUND':
            notification.error({
              message: t('error'),
            });
            break;
          default:
            notification.error({
              message: t('fail'),
              description: data.setUserPasswordByToken.status,
            });
        }
      },
    },
  );

  return useCallback(
    input => {
      mutation({
        variables: {
          input: {
            ...input,
            token,
          },
        },
      });
    },
    [token, mutation],
  );
};
