// import
import React, { useEffect, useContext } from 'react';

import { Role as RoleContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import Order from './Order';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const role = useContext(RoleContext);
  const { push } = useRouter();
  const isShopper = role === 'SHOPPER';

  useEffect(() => {
    if (!isShopper) push('/login');
  }, [isShopper, push]);

  return !isShopper ? null : <Order />;
});
