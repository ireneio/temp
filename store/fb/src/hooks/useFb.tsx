// typescript import
import { FbType } from '@meepshop/context/lib/Fb';

// import
import React, { useState, useEffect, useContext } from 'react';
import { notification } from 'antd';

import { Events as EventsContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import useFbLogin from './useFbLogin';

// definition
export default (
  appId: string | null,
  version: string,
): {
  fb: FbType | null;
  fbScript: React.ReactNode;
} => {
  const { t } = useTranslation('fb');
  const router = useRouter();
  const [fb, setFb] = useState<FbType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const events = useContext(EventsContext);
  const fbLogin = useFbLogin();

  useEffect(() => {
    const fbLoaded = (): void => {
      if (!window.FB) return;

      const windowFB = window.FB;

      events.removeEventListener('fb-loaded', fbLoaded);
      setFb({
        ...windowFB,
        login: redirectPath =>
          new Promise(resolve => {
            if (/(Line|Instagram|FBAN|FBAV)/gm.test(window.navigator.userAgent))
              router.push(
                [
                  `https://www.facebook.com/${version}/dialog/oauth?`,
                  `client_id=${appId}`,
                  `redirect_uri=https://${router.domain}/fbAuthForLine`,
                  `scope=email`,
                  `state=${redirectPath || router.pathname}`,
                  `response_type=token`,
                ].join('&'),
              );
            else
              windowFB.login(
                async ({ status, authResponse }) => {
                  if (status !== 'connected')
                    notification.error({ message: t('login-fail') });
                  else await fbLogin(authResponse.accessToken, redirectPath);

                  resolve();
                },
                { scope: 'public_profile,email' },
              );
          }),
      });
    };

    if (fb)
      return () => {
        events.removeEventListener('fb-loaded', fbLoaded);
      };

    fbLoaded();
    events.addEventListener('fb-loaded', fbLoaded);

    return () => {
      events.removeEventListener('fb-loaded', fbLoaded);
    };
  }, [appId, version, t, router, fb, events, fbLogin]);

  useEffect(() => {
    const load = (): void => {
      setIsLoaded(true);
      window.removeEventListener('load', load);
    };

    window.addEventListener('load', load);
  }, []);

  return {
    fb,
    fbScript:
      !appId || !isLoaded ? null : (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  window.FB.init({
                    appId: '${appId}',
                    cookie: true,
                    xfbml: true,
                    version: '${version}',
                  });
                  window.FB.AppEvents.logPageView();
                  window.events.dispatchEvent(new Event('fb-loaded'));
                };
              `,
            }}
          />

          <script src="https://connect.facebook.net/en_US/sdk.js" async defer />
        </>
      ),
  };
};
