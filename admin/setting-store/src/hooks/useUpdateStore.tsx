// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';

import useUpdateStoreSetting from './useUpdateStoreSetting';
import useUpdateStoreStatus from './useUpdateStoreStatus';

// graphql typescript
import { useBlockFragment as useBlockFragmentType } from '@meepshop/types/gqls/admin';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  data: useBlockFragmentType | null,
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
          if (err || !data?.id) return;

          const {
            id,
            domain: prevDomain,
            setting: prevSetting,
            locale: prevLocale,
            timezone: prevTimezone,
            description: prevDescription,
            logoImage: prevLogo,
            mobileLogoImage: prevMobileLogo,
            faviconImage: prevFavicon,
            metaData,
          } = data;

          const prevUpdateStoreSettingVariables = {
            id,
            domain: prevDomain,
            setting: prevSetting,
            locale: prevLocale,
            timezone: prevTimezone,
            description: prevDescription,
            logoId: prevLogo?.id || null,
            mobileLogoId: prevMobileLogo?.id || null,
            faviconId: prevFavicon?.id || null,
          };
          const prevSetStoreStatusVariables = metaData?.storeStatus;

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

          const updateStoreSettingVariables = {
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
          };

          try {
            if (
              !areEqual(
                updateStoreSettingVariables,
                prevUpdateStoreSettingVariables,
              )
            )
              await updateStoreSettingMutation(id, updateStoreSettingVariables);

            if (!areEqual(storeStatus, prevSetStoreStatusVariables))
              await setStoreStatusMutation(id, storeStatus);

            message.success(t('success'));
            resetFields();
          } catch (error) {
            if (error) message.error(error.message);
          }
        });
      },
      [
        validateFields,
        data,
        updateStoreSettingMutation,
        setStoreStatusMutation,
        t,
        resetFields,
      ],
    ),
  };
};
