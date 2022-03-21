// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  LoginInput as LoginInputType,
  login as loginType,
  loginVariables as loginVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { login } from '../gqls/useLogin';

// definition
export default (): ((input: LoginInputType) => void) => {
  const { t } = useTranslation('login');
  const { replace, previousUrl } = useRouter();
  const [mutation] = useMutation<loginType, loginVariablesType>(login, {
    onCompleted: data => {
      if (data.login.status !== 'OK') {
        notification.error({
          message: t('invalid-email-or-password'),
        });

        return;
      }

      notification.success({ message: t('login-success') });
      replace(previousUrl);
    },
  });

  return useCallback(
    input => {
      mutation({
        variables: {
          input,
        },
      });
    },
    [mutation],
  );
};
