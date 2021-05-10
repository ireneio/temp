// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message, notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  login as loginType,
  loginVariables as loginVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { login } from '../gqls/useLogin';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
): {
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
} => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const [mutation, { loading }] = useMutation<loginType, loginVariablesType>(
    login,
    {
      onCompleted: ({ login: { status, adminStatus, role } }: loginType) => {
        switch (status) {
          case 'INVALID_RECAPTCHA_RESPONSE':
            message.error('Invalid recaptcha response');
            break;

          case 'FAIL':
            message.error(t('submit.error'));
            break;

          case 'MERCHANT_APPLICANT':
            router.push('/set-up-store');
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
    onSubmit: useCallback(
      (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        validateFields(async (err, { email, password, isHelper, cname }) => {
          if (err) return;

          const gRecaptchaResponse = window.grecaptcha.getResponse();

          window.grecaptcha.reset();
          await mutation({
            variables: {
              input: {
                email,
                password,
                gRecaptchaResponse,
                ...(!isHelper
                  ? {}
                  : {
                      cname,
                    }),
              },
            },
          });
        });
      },
      [validateFields, mutation],
    ),
  };
};
