// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message, notification } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { login as loginType, loginVariables } from '@meepshop/types/gqls/admin';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
): {
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
} => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const [login, { loading }] = useMutation<loginType, loginVariables>(
    gql`
      mutation login($input: LoginInput!) {
        login(input: $input) @client {
          status
          role
          adminStatus
        }
      }
    `,
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
          await login({
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
      [validateFields, login],
    ),
  };
};
