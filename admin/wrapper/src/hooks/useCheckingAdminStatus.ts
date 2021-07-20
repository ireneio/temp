// import
import { useEffect } from 'react';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { useCheckingAdminStatusFragment as useCheckingAdminStatusFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (store: useCheckingAdminStatusFragmentType | null): boolean => {
  const { pathname, replace } = useRouter();

  // FIXME: remove store.adminStatus when complete migration
  const isNotOpened = Boolean(
    store && store.adminStatus && store.adminStatus !== 'OPEN',
  );

  useEffect(() => {
    if (isNotOpened && !/^\/bill-payment/.test(pathname))
      replace('/bill-payment');
  }, [pathname, replace, isNotOpened]);

  return isNotOpened;
};
