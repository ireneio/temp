// import
import React, { useEffect } from 'react';

import { useRouter } from '@meepshop/link';

// definition
export default React.memo(() => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/login') router.replace('/login');
  }, [router]);

  return null;
});
