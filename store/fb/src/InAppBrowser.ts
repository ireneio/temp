// import
import React, { useMemo, useContext, useEffect } from 'react';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Role as RoleContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import useFbLogin from './hooks/useFbLogin';

// definition
export default React.memo(() => {
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
      } else if (!(await fbLogin(accessToken, state)))
        router.replace(state || '/login');
    })();
  }, [router, fbLogin, role, accessToken, state, t]);

  return null;
});
