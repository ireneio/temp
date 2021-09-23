// import
import React, { useMemo, useContext, useEffect } from 'react';

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
    if (role === 'SHOPPER') router.replace(state);
    else {
      reduxFbLogin();
      fbLogin(accessToken, state);
    }
  }, [reduxFbLogin, router, fbLogin, role, accessToken, state]);

  return null;
});
