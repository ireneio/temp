// import
import React, { useMemo, useContext, useEffect } from 'react';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Role as RoleContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import useFbLogin from './hooks/useFbLogin';

// typescript definition
interface PropsType {
  // FIXME: remove after redux remove
  reduxFbLogin: () => void;
}

// definition
export default React.memo(({ reduxFbLogin }: PropsType) => {
  const { t } = useTranslation('fb');
  const router = useRouter();
  const fbLogin = useFbLogin();
  const role = useContext(RoleContext);
  const { access_token: accessToken, state } = useMemo(
    () =>
      decodeURIComponent(router.hash || '')
        .split(/&/g)
        .reduce((result: { [key: string]: string }, str) => {
          const [key, value] = str.split(/=/);

          return { ...result, [key]: value };
        }, {}),
    [router],
  );

  useEffect(() => {
    (async () => {
      if (role === 'SHOPPER') {
        router.replace(state);
        return;
      }

      if (!accessToken) {
        notification.error({ message: t('login-fail') });
        router.replace(state || '/login');
      } else {
        reduxFbLogin();
        if (!(await fbLogin(accessToken, state)))
          router.replace(state || '/login');
      }
    })();
  }, [reduxFbLogin, router, fbLogin, role, accessToken, state, t]);

  return null;
});
