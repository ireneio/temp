// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UpdateStore,
  updateStoreList as updateStoreListType,
  updateStoreListVariables as updateStoreListVariablesType,
  updateStoreSettingFragment as updateStoreSettingFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateStoreList,
  updateStoreSettingFragment,
} from '../gqls/useUpdateStoreSetting';

// definition
export default (): {
  loading: boolean;
  updateStoreSettingMutation: (value: UpdateStore) => void;
} => {
  const { t, i18n } = useTranslation('setting-store');

  const [mutation, { loading }] = useMutation<
    updateStoreListType,
    updateStoreListVariablesType
  >(updateStoreList);

  return {
    loading,
    updateStoreSettingMutation: useCallback(
      (value): Promise<void> =>
        new Promise((resolve, reject) => {
          mutation({
            variables: {
              value: [value],
            },
            update: (
              cache: DataProxy,
              { data }: { data: updateStoreListType },
            ) => {
              if (!data.updateStoreList?.[0]?.id) {
                reject(new Error(t('error')));
                return;
              }

              i18n.changeLanguage(value.locale || 'zh_TW');
              cache.writeFragment<updateStoreSettingFragmentType>({
                id: value.id,
                fragment: updateStoreSettingFragment,
                data: {
                  __typename: 'Store' as const,
                  id: value.id,
                  locale: value.locale || null,
                  timezone: value.timezone || null,
                  domain: value.domain || null,
                  description: !value.description
                    ? null
                    : {
                        __typename: 'DescriptionObjectType' as const,
                        introduction: value.description.introduction || null,
                        name: value.description.name || null,
                      },
                  setting: {
                    __typename: 'SettingObjectType' as const,
                    senderInfo: !value.setting?.senderInfo
                      ? null
                      : {
                          __typename: 'senderInfoObjectType' as const,
                          name: value.setting.senderInfo.name || null,
                          phoneNumber:
                            value.setting.senderInfo.phoneNumber || null,
                          streetAddress:
                            value.setting.senderInfo.streetAddress || null,
                        },
                  },
                  logoImage: value.logoId
                    ? {
                        __typename: 'Image' as const,
                        id: value.logoId,
                      }
                    : null,
                  mobileLogoImage: value.mobileLogoId
                    ? {
                        __typename: 'Image' as const,
                        id: value.mobileLogoId,
                      }
                    : null,
                  faviconImage: value.faviconId
                    ? {
                        __typename: 'Image' as const,
                        id: value.faviconId,
                      }
                    : null,
                },
              });
              resolve();
            },
          });
        }),
      [i18n, t, mutation],
    ),
  };
};
