// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  updateGoodDealSettings as updateGoodDealSettingsType,
  updateGoodDealSettingsVariables as updateGoodDealSettingsVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateGoodDealSettings } from '../gqls/useUpdateGoodDealSettings';

// definition
export default (): ((
  updateStoreList: updateGoodDealSettingsVariablesType['updateStoreList'],
) => Promise<void>) => {
  const [updateGoodDealSettingsMutation] = useMutation<
    updateGoodDealSettingsType,
    updateGoodDealSettingsVariablesType
  >(updateGoodDealSettings);

  return useCallback(
    async (
      updateStoreList: updateGoodDealSettingsVariablesType['updateStoreList'],
    ) => {
      await updateGoodDealSettingsMutation({
        variables: {
          updateStoreList,
        },
      });
    },
    [updateGoodDealSettingsMutation],
  );
};
