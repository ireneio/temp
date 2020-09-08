// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useState, useCallback } from 'react';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useUpdateFacebookSetting from './useUpdateFacebookSetting';
import useUpdateEcfitSettings from './useUpdateEcfitSettings';
import useUpdateGoodDealSettings from './useUpdateGoodDealSettings';
import useSetGaViewId from './useSetGaViewId';

// graphql typescript
import { useSaveFragment as useSaveFragmentType } from './__generated__/useSaveFragment';

// typescript definition
interface ReturnType {
  save: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

// definition
export const useSaveFragment = gql`
  fragment useSaveFragment on Store {
    id
    experiment {
      isSmartConversionModuleEnabled
    }
  }
`;

export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  store: useSaveFragmentType | null,
): ReturnType => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('setting-third-party');
  const updateFacebookSetting = useUpdateFacebookSetting();
  const updateEcfitSettings = useUpdateEcfitSettings();
  const updateGoodDealSettings = useUpdateGoodDealSettings();
  const setGaViewId = useSetGaViewId();

  return {
    loading,
    save: useCallback(
      e => {
        e.preventDefault();
        validateFields(async (err, { facebook, ecfit, goodDeal, gaViewId }) => {
          if (err || !store?.id) return;

          setLoading(true);

          try {
            if (facebook) {
              const { status: isLoginEnabled, ...input } = facebook;

              await updateFacebookSetting(store.id, {
                ...input,
                isLoginEnabled,
              });
            }

            if (ecfit) {
              const { status: isEnabled, ...input } = ecfit;

              await updateEcfitSettings(store.id, {
                ...input,
                isEnabled,
              });
            }

            if (goodDeal)
              await updateGoodDealSettings([
                {
                  id: store.id,
                  setting: {
                    gooddeal: {
                      ...goodDeal,
                      status: goodDeal.status ? 1 : 0,
                    },
                  },
                },
              ]);

            if (store.experiment?.isSmartConversionModuleEnabled)
              await setGaViewId(store.id, gaViewId || null);

            resetFields();
            message.success(t('success'));
          } catch (error) {
            message.error(t('error'));
          }

          setLoading(false);
        });
      },
      [
        validateFields,
        resetFields,
        store,
        t,
        updateFacebookSetting,
        updateEcfitSettings,
        updateGoodDealSettings,
        setGaViewId,
      ],
    ),
  };
};
