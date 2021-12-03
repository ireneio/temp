// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UpdateStoreApp as UpdateStoreAppType,
  updateSettingAppList as updateSettingAppListType,
  updateSettingAppListVariables as updateSettingAppListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateSettingAppList } from '../gqls/useUpdateAppStatus';

// definition
export default (): {
  loading: boolean;
  updateAppStatus: (app: UpdateStoreAppType) => void;
} => {
  const { t } = useTranslation('setting-apps');
  const [mutation, { loading }] = useMutation<
    updateSettingAppListType,
    updateSettingAppListVariablesType
  >(updateSettingAppList, {
    onCompleted: data => {
      const error = data.updateStoreAppList?.some(list => list?.error);

      if (error) message.error(t('error'));
    },
  });

  return {
    loading,
    updateAppStatus: useCallback(
      app => {
        mutation({
          variables: {
            updateStoreAppList: [app],
          },
        });
      },
      [mutation],
    ),
  };
};
