// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useState, useCallback } from 'react';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

import useUpdateFacebookSetting from './useUpdateFacebookSetting';
import useUpdateLineLoginSetting from './useUpdateLineLoginSetting';
import useUpdateEcfitSettings from './useUpdateEcfitSettings';
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
  line: {
    status: boolean;
    channelId: string;
    channelSecret: string;
  };
  ecfit: {
    status: boolean;
    serviceType: EcfitServiceTypeEnum;
    companyToken: string;
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
  const updateLineLoginSetting = useUpdateLineLoginSetting();
  const updateEcfitSettings = useUpdateEcfitSettings();
  const { setGaViewId, processorStatus } = useSetGaViewId(
    storeId || 'null-id', // SHOULD_NOT_BE_NULL
  );

  return {
    loading: loading || processorStatus === 'PROCESSING',
    save: useCallback(
      async ({ facebook, line, ecfit, gaViewId }) => {
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

          if (line) {
            const { status: isLoginEnabled, ...input } = line;

            await updateLineLoginSetting(storeId, {
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
        storeId,
        setGaViewId,
        t,
        resetFields,
        updateFacebookSetting,
        updateLineLoginSetting,
        updateEcfitSettings,
      ],
    ),
  };
};
