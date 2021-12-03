// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import mergeWith from '@meepshop/utils/lib/merge';

// graphql typescript
import {
  UpdateStore as UpdateStoreType,
  updateShoppingSettingFragment as updateShoppingSettingFragmentType,
  getShoppingSetting_viewer_store as getShoppingSettingViewerStoreType,
  settingShoppingUpdateStoreList as settingShoppingUpdateStoreListType,
  updateShoppingSettingFragment_setting as updateShoppingSettingFragmentSettingType,
  settingShoppingUpdateStoreListVariables as settingShoppingUpdateStoreListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  settingShoppingUpdateStoreList,
  updateShoppingSettingFragment,
} from '../gqls/useUpdateStoreList';

// definition
export default (
  store: getShoppingSettingViewerStoreType | null,
): {
  loading: boolean;
  updateStoreList: (setting: UpdateStoreType['setting']) => void;
} => {
  const { t } = useTranslation('setting');
  const [mutation, { loading }] = useMutation<
    settingShoppingUpdateStoreListType,
    settingShoppingUpdateStoreListVariablesType
  >(settingShoppingUpdateStoreList);

  return {
    loading,
    updateStoreList: useCallback(
      (setting): Promise<void> =>
        new Promise((resolve, reject) => {
          const id = store?.id || null;
          const shoppingSetting = store?.setting || null;

          if (!id || !shoppingSetting || !setting) return;

          mutation({
            variables: {
              updateStoreList: [
                {
                  id,
                  setting,
                },
              ],
            },
            // FIXME: https://www.notion.so/specification/d0d7ddc082a847929801ceeaba48e099
            optimisticResponse: {
              updateStoreList: [
                {
                  __typename: 'Store',
                  id,
                  error: null,
                },
              ],
            },
            update: (
              cache: DataProxy,
              { data }: { data: settingShoppingUpdateStoreListType },
            ) => {
              if (data.updateStoreList?.[0]?.error) {
                reject(new Error(t('error')));
                return;
              }

              cache.writeFragment<updateShoppingSettingFragmentType>({
                id,
                fragment: updateShoppingSettingFragment,
                fragmentName: 'updateShoppingSettingFragment',
                data: {
                  __typename: 'Store',
                  id,
                  setting: {
                    ...mergeWith<
                      updateShoppingSettingFragmentSettingType,
                      UpdateStoreType['setting']
                    >(shoppingSetting, setting),
                    shopperLoginMessageDraft: !setting.shopperLoginMessage
                      ? null
                      : JSON.parse(setting.shopperLoginMessage),
                  },
                },
              });
              resolve();
            },
          });
        }),
      [mutation, store, t],
    ),
  };
};
