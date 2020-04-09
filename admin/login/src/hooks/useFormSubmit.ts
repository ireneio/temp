// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback, useState } from 'react';
import { message, notification } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';

import { useTranslation } from '@admin/utils/lib/i18n';
import { useRouter } from '@admin/link';

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
                ? {}
                : {
                    type: 'helper',
                    cname,
                  }),
            }),
          }).then(res => res.json());

          if (error) {
            message.error(error);
            setLoading(false);
            return;
          }

          if (adminStatus === 'OPEN') {
            message.success(t('submit.success'));
            client.resetStore();
            router.push('/');
            return;
          }

          if (type === 'merchant') {
            message.success(t('submit.success'));
            client.resetStore();
            router.push('/bill-payment');
            return;
          }

          notification.warning({
            message: t('submit.error.title'),
            description: t('submit.error.content'),
          });
          setLoading(false);
        });
      },
      [client, t, router, validateFields],
    ),
  };
};
