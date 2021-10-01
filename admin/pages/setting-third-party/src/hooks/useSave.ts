// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useState, useCallback } from 'react';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

import useUpdateFacebookSetting from './useUpdateFacebookSetting';
import useUpdateEcfitSettings from './useUpdateEcfitSettings';
import useUpdateGoodDealSettings from './useUpdateGoodDealSettings';
import useSetGaViewId from './useSetGaViewId';

// graphql typescript
import { EcfitServiceTypeEnum } from '@meepshop/types/gqls/admin';

// typescript definition
interface ValuesType {
  facebook: {
    status: boolean;
    appId: string;
    appSecret: string;
  };
  ecfit: {
    status: boolean;
    serviceType: EcfitServiceTypeEnum;
    companyToken: string;
    apiKey: string;
  };
  goodDeal: {
    status: boolean;
    corporationId: string;
    apiKey: string;
  };
  gaViewId: string | null;
}

// definition
export default (
  { resetFields }: FormInstance,
  storeId: string | null,
): {
  save: (values: ValuesType) => void;
  loading: boolean;
} => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('setting-third-party');
  const updateFacebookSetting = useUpdateFacebookSetting();
  const updateEcfitSettings = useUpdateEcfitSettings();
  const updateGoodDealSettings = useUpdateGoodDealSettings();
  const { setGaViewId, processorStatus } = useSetGaViewId(
    storeId || 'null-id', // SHOULD_NOT_BE_NULL
  );

  return {
    loading: loading || processorStatus === 'PROCESSING',
    save: useCallback(
      async ({ facebook, ecfit, goodDeal, gaViewId }) => {
        if (!storeId) return;

        setLoading(true);

        try {
          if (facebook) {
            const { status: isLoginEnabled, ...input } = facebook;

            await updateFacebookSetting(storeId, {
              ...input,
              isLoginEnabled,
            });
          }

          if (ecfit) {
            const { status: isEnabled, ...input } = ecfit;

            await updateEcfitSettings(storeId, {
              ...input,
              isEnabled,
            });
          }

          if (goodDeal)
            await updateGoodDealSettings([
              {
                id: storeId,
                setting: {
                  gooddeal: {
                    ...goodDeal,
                    status: goodDeal.status ? 1 : 0,
                  },
                },
              },
            ]);

          // ga view id 允許清空
          await setGaViewId(gaViewId || '');
          message.success(t('success'));
          resetFields();
        } catch (error) {
          message.error(t('error'));
        }

        setLoading(false);
      },
      [
        resetFields,
        storeId,
        t,
        updateFacebookSetting,
        updateEcfitSettings,
        updateGoodDealSettings,
        setGaViewId,
      ],
    ),
  };
};