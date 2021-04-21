// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useUpdateStoreSetting from './useUpdateStoreSetting';
import useUpdateStoreStatus from './useUpdateStoreStatus';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  id: string | null,
): {
  loading: boolean;
  updateStore: (e: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const { t } = useTranslation('setting-store');

  const {
    loading: updateStoreSettingLoading,
    updateStoreSettingMutation,
  } = useUpdateStoreSetting();
  const {
    loading: updateStoreStatusLoading,
    setStoreStatusMutation,
  } = useUpdateStoreStatus();

  return {
    loading: updateStoreSettingLoading || updateStoreStatusLoading,
    updateStore: useCallback(
      e => {
        e.preventDefault();

        validateFields(async (err, value) => {
          if (err || !id) return;

          const {
            domain,
            timezone,
            locale,
            streetAddress,
            senderName,
            phoneNumber,
            name,
            introduction,
            mobileLogo,
            logo,
            favicon,
            storeStatus,
          } = value;

          try {
            await Promise.all([
              updateStoreSettingMutation(id, {
                id,
                domain: domain ? [domain] : [],
                setting: {
                  senderInfo: {
                    name: senderName,
                    phoneNumber,
                    streetAddress,
                  },
                },
                locale,
                timezone,
                description: { name, introduction },
                logoId: logo?.id || null,
                mobileLogoId: mobileLogo?.id || null,
                faviconId: favicon?.id || null,
              }),
              setStoreStatusMutation(id, storeStatus),
            ]);
            message.success(t('success'));
            resetFields();
          } catch (error) {
            message.error(error.message);
          }
        });
      },
      [
        validateFields,
        id,
        updateStoreSettingMutation,
        setStoreStatusMutation,
        t,
        resetFields,
      ],
    ),
  };
};
