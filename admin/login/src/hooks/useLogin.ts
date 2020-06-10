// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message, notification } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import { useRouter } from '@admin/link';

// graphql typescript
import { refetchCookies as refetchCookiesType } from './__generated__/refetchCookies';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
): {
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
} => {
  const client = useApolloClient();
  const { t } = useTranslation('login');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [refetchCookies] = useMutation<refetchCookiesType>(gql`
    mutation refetchCookies {
      refetchCookies @client
    }
  `);

  return {
    loading,
    onSubmit: useCallback(
      (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        validateFields(async (err, { email, password, isHelper, cname }) => {
          if (err) return;

          const gRecaptchaResponse = window.grecaptcha.getResponse();

          window.grecaptcha.reset();
          setLoading(true);

          const { error, type, adminStatus } = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              'g-recaptcha-response': gRecaptchaResponse,
              ...(!isHelper
                ? { type: 'merchant' }
                : {
                    type: 'helper',
                    cname,
                  }),
            }),
          }).then(res => res.json());

          if (error) {
            message.error(t('submit.error'));
            setLoading(false);
            return;
          }

          if (adminStatus === 'OPEN') {
            message.success(t('submit.success'));
            client.resetStore();
            refetchCookies();
            router.push('/');
            return;
          }

          if (type === 'merchant') {
            message.success(t('submit.success'));
            client.resetStore();
            refetchCookies();
            router.push('/bill-payment');
            return;
          }

          notification.warning({
            message: t('submit.close.title'),
            description: t('submit.close.content'),
          });
          setLoading(false);
        });
      },
      [client, t, router, refetchCookies, validateFields],
    ),
  };
};
