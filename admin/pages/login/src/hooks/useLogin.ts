// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  login as loginType,
  loginVariables as loginVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { login } from '../gqls/useLogin';

// typescript definition
interface ValuesType {
  email: string;
  password: string;
  isHelper: boolean;
  cname?: string;
}

// definition
export default (
  grecaptcha: typeof window['grecaptcha'] | null,
): {
  loading: boolean;
  login: (values: ValuesType) => void;
} => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const [mutation, { loading }] = useMutation<loginType, loginVariablesType>(
    login,
    {
      onCompleted: ({
        login: { status, adminStatus, role, token },
      }: loginType) => {
        switch (status) {
          case 'INVALID_RECAPTCHA_RESPONSE':
            message.error('Invalid recaptcha response');
            break;

          case 'FAIL':
            message.error(t('submit.error'));
            break;

          case 'MERCHANT_APPLICANT':
            router.push(`/set-up-store/${token}`);
            break;

          default:
            if (adminStatus === 'OPEN') {
              message.success(t('submit.success'));
              router.push('/');
            } else if (role === 'MERCHANT') {
              message.success(t('submit.success'));
              router.push('/bill-payment');
            } else
              notification.warning({
                message: t('submit.close.title'),
                description: t('submit.close.content'),
              });
        }
      },
    },
  );

  return {
    loading,
    login: useCallback(
      async ({ isHelper, cname, ...input }) => {
        if (!grecaptcha) return;

        const gRecaptchaResponse = grecaptcha.getResponse();

        if (!gRecaptchaResponse) {
          message.error('Invalid recaptcha response');
          return;
        }

        grecaptcha.reset();
        await mutation({
          variables: {
            input: {
              ...input,
              ...(!isHelper
                ? {}
                : {
                    cname,
                  }),
              gRecaptchaResponse,
            },
          },
        });
      },
      [grecaptcha, mutation],
    ),
  };
};
