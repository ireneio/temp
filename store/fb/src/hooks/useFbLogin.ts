// import
import { useCallback, useContext, useRef } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { AdTrack as AdTrackContext } from '@meepshop/context';

// definition
export default (): ((
  accessToken: string,
  redirectPath?: string,
) => Promise<void>) => {
  const { t } = useTranslation('fb');
  const client = useApolloClient();
  const router = useRouter();
  const adTrack = useContext(AdTrackContext);
  const prevAccessTokenRef = useRef<string | null>(null);

  return useCallback(
    async (accessToken, redirectPath) => {
      if (accessToken === prevAccessTokenRef.current) return;

      prevAccessTokenRef.current = accessToken;

      const res = await fetch('/api/auth/fbLogin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ accessToken }),
      });

      if (res.status !== 200) return;

      const { code } = await res.json();

      switch (code) {
        case 200:
        case 201:
          await client.resetStore();

          if (201) adTrack.completeRegistration();

          if (redirectPath) router.push(redirectPath);
          break;

        case 2010:
          notification.error({ message: t('cannot-use') });
          break;

        case 2011:
          notification.error({ message: t('cannot-get-email') });
          break;

        case 2003:
          notification.error({ message: t('cannot-use') });
          break;

        default:
          notification.error({ message: t('login-fail') });
          break;
      }
    },
    [t, client, router, adTrack],
  );
};
