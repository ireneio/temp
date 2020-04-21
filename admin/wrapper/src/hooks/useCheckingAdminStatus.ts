// import
import { useEffect } from 'react';
import gql from 'graphql-tag';

import { useRouter } from '@admin/link';

// graphql typescript
import { useCheckingAdminStatusFragment as useCheckingAdminStatusFragmentType } from './__generated__/useCheckingAdminStatusFragment';

// definition
export const useCheckingAdminStatusFragment = gql`
  fragment useCheckingAdminStatusFragment on Store {
    adminStatus
  }
`;

export default (
  store: useCheckingAdminStatusFragmentType | undefined | null,
): boolean => {
  const router = useRouter();
  const isNotOpened = Boolean(store && store.adminStatus !== 'OPEN');

  useEffect(() => {
    if (isNotOpened) router.replace('/bill-payment');
  }, [router, isNotOpened]);

  return isNotOpened;
};
