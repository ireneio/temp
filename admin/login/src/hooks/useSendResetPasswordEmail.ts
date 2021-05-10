// import
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  sendResetPasswordEmail as sendResetPasswordEmailType,
  sendResetPasswordEmailVariables as sendResetPasswordEmailVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { sendResetPasswordEmail } from '../gqls/useSendResetPasswordEmail';

// definition
export default (): {
  loading: boolean;
  countdown: number;
  sendResetPasswordEmail: (input: sendResetPasswordEmailVariablesType) => void;
} => {
  const { t } = useTranslation('login');
  const [countdown, setCountdown] = useState(0);

  const [mutation, { loading }] = useMutation<
    sendResetPasswordEmailType,
    sendResetPasswordEmailVariablesType
  >(sendResetPasswordEmail, {
    onCompleted: data => {
      const status = data?.sendResetPasswordEmail.status;

      switch (status) {
        case 'OK': {
          message.success(t('forget-password.success'));

          let submitCountdown = 30;
          setCountdown(submitCountdown);

          const countdownInterval = setInterval(() => {
            if (submitCountdown === 1) clearInterval(countdownInterval);
            submitCountdown -= 1;
            setCountdown(submitCountdown);
          }, 1000);

          break;
        }
        case 'FAIL_CANNOT_FIND_USER':
          message.warning(t('forget-password.fail'));
          break;
        default:
          message.error(status);
          break;
      }
    },
  });

  return {
    loading,
    countdown,
    sendResetPasswordEmail: useCallback(
      (input: sendResetPasswordEmailVariablesType) => {
        mutation({
          variables: input,
        });
      },
      [mutation],
    ),
  };
};
