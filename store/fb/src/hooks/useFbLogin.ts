// import
import { useCallback, useContext, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { AdTrack as AdTrackContext } from '@meepshop/context';

// definition
export default (): ((
  accessToken: string,
  redirectPath?: string,
) => Promise<boolean>) => {
  const { t } = useTranslation('fb');
  const client = useApolloClient();
  const router = useRouter();
  const adTrack = useContext(AdTrackContext);
  const prevAccessTokenRef = useRef<string | null>(null);

  return useCallback(
    async (accessToken, redirectPath) => {
      if (accessToken === prevAccessTokenRef.current) return true;

      prevAccessTokenRef.current = accessToken;

      const res = await fetch('/api/auth/fb-login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ accessToken }),
      });

      if (res.status !== 200) return false;

      const { code } = await res.json();

      switch (code) {
        case 200:
        case 201:
          await client.resetStore();

          if (201) adTrack.completeRegistration();

          if (redirectPath) router.push(redirectPath);
          return true;

        case 2010:
          notification.error({ message: t('cannot-use') });
          return false;

        case 2011:
          notification.error({ message: t('cannot-get-email') });
          return false;

        case 2003:
          notification.error({ message: t('cannot-use') });
          return false;

        default:
          notification.error({
            message: t('login-fail'),
            description: t('login-fail-description'),
          });
          return false;
      }
    },
    [t, client, router, adTrack],
  );
};
