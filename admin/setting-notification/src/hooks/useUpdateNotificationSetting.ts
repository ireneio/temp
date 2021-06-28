// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

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

// typescript definition
interface ValuesType {
  recipientEmail: string;
  orderCreated: boolean;
  orderMessageReceived: boolean;
  orderReturnedOrExchanged: boolean;
  orderTransferMessageReceived: boolean;
  productQAReceived: boolean;
}

// definition
export default (
  id: string | null,
): {
  updateNotification: (values: ValuesType) => void;
  loading: boolean;
} => {
  const { t } = useTranslation('setting-notification');
  const [mutation, { loading }] = useMutation<
    updateNotificationSettingType,
    updateNotificationSettingVariablesType
  >(updateNotificationSetting);

  return {
    updateNotification: useCallback(
      value => {
        if (!id) return;

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
            message.success(t('success'));
          },
        });
      },
      [mutation, id, t],
    ),
    loading,
  };
};
