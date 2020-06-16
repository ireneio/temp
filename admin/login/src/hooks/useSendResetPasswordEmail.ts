// import
import { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  sendResetPasswordEmail as sendResetPasswordEmailType,
  sendResetPasswordEmailVariables as sendResetPasswordEmailVariablesType,
} from './__generated__/sendResetPasswordEmail';

// definition
export default (): {
  loading: boolean;
  countdown: number;
  sendResetPasswordEmail: (input: sendResetPasswordEmailVariablesType) => void;
} => {
  const { t } = useTranslation('login');
  const [countdown, setCountdown] = useState(0);

  const [sendResetPasswordEmail, { loading }] = useMutation<
    sendResetPasswordEmailType
  >(
    gql`
      mutation sendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
        sendResetPasswordEmail(input: $input) {
          status
        }
      }
    `,
    {
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
    },
  );

  return {
    loading,
    countdown,
    sendResetPasswordEmail: useCallback(
      (input: sendResetPasswordEmailVariablesType) => {
        sendResetPasswordEmail({
          variables: input,
        });
      },
      [sendResetPasswordEmail],
    ),
  };
};
