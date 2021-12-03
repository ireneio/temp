// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UpdateStoreApp as UpdateStoreAppType,
  updateStoreAppList as updateStoreAppListType,
  updateStoreAppListVariables as updateStoreAppListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateStoreAppList } from '../gqls/useUpdateStoreAppList';

// definition
export default (): {
  loading: boolean;
  updateStoreAppList: (appList: UpdateStoreAppType[]) => void;
} => {
  const { t } = useTranslation('setting');
  const [mutation, { loading }] = useMutation<
    updateStoreAppListType,
    updateStoreAppListVariablesType
  >(updateStoreAppList, {
    onCompleted: data => {
      const error = data.updateStoreAppList?.some(list => list?.error);

      if (error) message.error(t('error'));
    },
  });

  return {
    loading,
    updateStoreAppList: useCallback(
      appList =>
        mutation({
          variables: {
            updateStoreAppList: appList,
          },
          // FIXME: https://www.notion.so/specification/d0d7ddc082a847929801ceeaba48e099
          optimisticResponse: {
            updateStoreAppList: appList.map(({ id, isInstalled }) => ({
              __typename: 'StoreApp',
              id,
              isInstalled: isInstalled ?? 0,
              error: null,
            })),
          },
        }),
      [mutation],
    ),
  };
};
