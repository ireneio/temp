// import
import { useCallback, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UserTypeEnum,
  sendResetPasswordEmail as sendResetPasswordEmailType,
  sendResetPasswordEmailVariables as sendResetPasswordEmailVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { sendResetPasswordEmail } from '../gqls/useSendResetPasswordEmail';

// typescript definition
interface ValuesType {
  email: string;
  isHelper: boolean;
  cname?: string;
}

// definition
export default (): {
  loading: boolean;
  countdown: number;
  sendResetPasswordEmail: (values: ValuesType) => void;
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
        case 'OK':
          message.success(t('forget-password.success'));
          setCountdown(30);
          break;
        case 'FAIL_CANNOT_FIND_USER':
          message.warning(t('forget-password.fail'));
          break;
        default:
          message.error(status);
          break;
      }
    },
  });

  useEffect(() => {
    let countdownTimeout: ReturnType<typeof setTimeout>;

    if (countdown !== 0)
      countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

    return () => clearTimeout(countdownTimeout);
  }, [countdown]);

  return {
    loading,
    countdown,
    sendResetPasswordEmail: useCallback(
      ({ isHelper, ...input }) => {
        mutation({
          variables: {
            input: {
              ...input,
              type: (isHelper ? 'HELPER' : 'MERCHANT') as UserTypeEnum,
            },
          },
        });
      },
      [mutation],
    ),
  };
};
