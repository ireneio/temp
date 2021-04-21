// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  SetStoreStatusInput,
  setStoreStatus as setStoreStatusType,
  setStoreStatusVariables as setStoreStatusVariablesType,
  useUpdateStoreStatusFragment as useUpdateStoreStatusFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  setStoreStatus,
  useUpdateStoreStatusFragment,
} from '../gqls/useUpdateStoreStatus';

// definition
export default (): {
  loading: boolean;
  setStoreStatusMutation: (
    id: string,
    storeStatus: SetStoreStatusInput['storeStatus'],
  ) => void;
} => {
  const { t } = useTranslation('setting-store');

  const [mutation, { loading }] = useMutation<
    setStoreStatusType,
    setStoreStatusVariablesType
  >(setStoreStatus);

  return {
    loading,
    setStoreStatusMutation: useCallback(
      (id, storeStatus): Promise<void> =>
        new Promise((resolve, reject) => {
          mutation({
            variables: {
              input: { storeStatus },
            },
            update: (
              cache: DataProxy,
              { data }: { data: setStoreStatusType },
            ) => {
              if (data?.setStoreStatus.result !== 'SUCCESS') {
                reject(new Error(t(data?.setStoreStatus.result || 'error')));
                return;
              }

              cache.writeFragment<useUpdateStoreStatusFragmentType>({
                id,
                fragment: useUpdateStoreStatusFragment,
                data: {
                  __typename: 'Store' as const,
                  id,
                  metaData: {
                    __typename: 'StoreMetaData' as const,
                    storeStatus,
                  },
                },
              });
            },
          }).then(() => resolve());
        }),
      [t, mutation],
    ),
  };
};
