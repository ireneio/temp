// typescript import
import { ValuesType } from './useInitialValues';

// import
import { useCallback } from 'react';
import { areEqual } from 'fbjs';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

import useUpdateStoreSetting from './useUpdateStoreSetting';
import useUpdateStoreStatus from './useUpdateStoreStatus';

// definition
export default (
  id: string | null,
  initialValues: ValuesType | undefined,
): {
  loading: boolean;
  updateStore: (values: ValuesType) => void;
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
      async ({
        logoImage,
        mobileLogoImage,
        faviconImage,
        storeStatus,
        domain,
        ...values
      }) => {
        const { storeStatus: initialStoreStatus, ...initialStoreSetting } =
          initialValues || {};

        if (!id) return;

        try {
          const mutations = [];

          if (
            !areEqual(initialStoreSetting, {
              ...values,
              logoImage,
              mobileLogoImage,
              faviconImage,
            })
          )
            mutations.push(
              updateStoreSettingMutation({
                ...values,
                id,
                domain: domain.filter(Boolean),
                logoId: logoImage?.id || null,
                mobileLogoId: mobileLogoImage?.id || null,
                faviconId: faviconImage?.id || null,
              }),
            );

          if (!areEqual(initialStoreStatus, storeStatus))
            mutations.push(setStoreStatusMutation(id, storeStatus));

          await Promise.all(mutations);
          message.success(t('success'));
        } catch (error) {
          message.error(error.message);
        }
      },
      [
        id,
        initialValues,
        t,
        updateStoreSettingMutation,
        setStoreStatusMutation,
      ],
    ),
  };
};
