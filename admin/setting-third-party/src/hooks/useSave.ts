// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useUpdateFacebookSetting from './useUpdateFacebookSetting';
import useUpdateEcfitSettings from './useUpdateEcfitSettings';
import useUpdateGoodDealSettings from './useUpdateGoodDealSettings';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  storeId: string | null,
): ((e: React.MouseEvent<HTMLButtonElement>) => void) => {
  const { t } = useTranslation('setting-third-party');
  const updateFacebookSetting = useUpdateFacebookSetting();
  const updateEcfitSettings = useUpdateEcfitSettings();
  const updateGoodDealSettings = useUpdateGoodDealSettings();

  return useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, { facebook, ecfit, goodDeal }) => {
        if (err || !storeId) return;

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

          resetFields();
          message.success(t('success'));
        } catch (error) {
          message.error(t('error'));
        }
      });
    },
    [
      validateFields,
      resetFields,
      storeId,
      t,
      updateFacebookSetting,
      updateEcfitSettings,
      updateGoodDealSettings,
    ],
  );
};
