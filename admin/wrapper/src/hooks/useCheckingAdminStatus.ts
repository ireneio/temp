// import
import { useEffect } from 'react';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { useCheckingAdminStatusFragment as useCheckingAdminStatusFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (store: useCheckingAdminStatusFragmentType | null): boolean => {
  const router = useRouter();

  // FIXME: remove store.adminStatus when complete migration
  const isNotOpened = Boolean(
    store && store.adminStatus && store.adminStatus !== 'OPEN',
  );

  useEffect(() => {
    if (isNotOpened) router.replace('/bill-payment');
  }, [router, isNotOpened]);

  return isNotOpened;
};
