// typescript import
import { FbType } from '@meepshop/context/lib/Fb';

// import
import { useEffect, useState, useRef, useCallback } from 'react';
import { notification } from 'antd';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

import useFbLogin from './useFbLogin';

// definition
export default (
  appId: string,
  version: string,
): { fb: FbType | null; onLoad: () => void } => {
  const { t } = useTranslation('fb');
  const router = useRouter();
  const [fb, setFb] = useState<FbType | null>(null);
  const asPathRef = useRef(router.asPath);
  const fbLogin = useFbLogin();

  useEffect(() => {
    asPathRef.current = router.asPath;
  }, [router.asPath]);

  return {
    fb,
    onLoad: useCallback(() => {
      const render = (): void => {
        const windowFB = window.FB;

        window.FB.Event.unsubscribe('xfbml.render', render);

        setFb({
          ...windowFB,
          login: redirectPath =>
            new Promise<void>(resolve => {
              if (
                /(Line|Instagram|FBAN|FBAV)/gm.test(window.navigator.userAgent)
              )
                router.push(
                  [
                    `https://www.facebook.com/${version}/dialog/oauth?`,
                    `client_id=${appId}`,
                    `redirect_uri=https://${router.domain}/fb-login`,
                    `scope=email`,
                    `state=${redirectPath || asPathRef.current}`,
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

      window.FB.Event.subscribe('xfbml.render', render);

      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version,
      });
    }, [appId, fbLogin, router, t, version]),
  };
};
