// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateNotificationSetting as updateNotificationSettingType,
  updateNotificationSettingVariables as updateNotificationSettingVariablesType,
  useUpdateNotificationSettingFragment as useUpdateNotificationSettingFragmentType,
} from '@meepshop/types/gqls/admin';

// grpahql import
import {
  updateNotificationSetting,
  useUpdateNotificationSettingFragment,
} from '../gqls/useUpdateNotificationSetting';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  store: useUpdateNotificationSettingFragmentType | null,
): {
  updateNotification: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
} => {
  const { t } = useTranslation('setting-notification');

  const [mutation, { loading }] = useMutation<
    updateNotificationSettingType,
    updateNotificationSettingVariablesType
  >(updateNotificationSetting);

  return {
    updateNotification: useCallback(
      e => {
        e.preventDefault();
        validateFields((err, value) => {
          const id = store?.id;
          if (err || !id) return;

          mutation({
            variables: { value },
            update: (
              cache: DataProxy,
              { data }: { data: updateNotificationSettingType },
            ) => {
              if (
                data?.setStoreEmailNotificationEventSubscription.status !==
                'SUCCESS'
              ) {
                resetFields();
                message.error(t('error'));
                return;
              }

              cache.writeFragment<useUpdateNotificationSettingFragmentType>({
                id,
                fragment: useUpdateNotificationSettingFragment,
                data: {
                  __typename: 'Store',
                  id,
                  setting: {
                    __typename: 'SettingObjectType',
                    emailNotificationEventSubscription: {
                      __typename: 'StoreEmailNotificationEventSubscription',
                      ...value,
                    },
                  },
                },
              });

              resetFields();
              message.success(t('success'));
            },
          });
        });
      },
      [mutation, validateFields, resetFields, store, t],
    ),
    loading,
  };
};
