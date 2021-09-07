// import
import React, { useEffect, useContext } from 'react';

import { Role as RoleContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import Order from './Order';
import PaymentFail from './PaymentFail';

// Use to copy mixin.less
import './styles/mixin.less';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const role = useContext(RoleContext);
  const { push, query } = useRouter();
  const isShopper = role === 'SHOPPER';

  useEffect(() => {
    if (!isShopper) push('/login');
  }, [isShopper, push]);

  if (!isShopper) return null;

  if (query.error || query.message) return <PaymentFail />;

  return <Order />;
});
