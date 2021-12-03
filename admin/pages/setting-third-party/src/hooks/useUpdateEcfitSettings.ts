// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  updateEcfitSettings as updateEcfitSettingsType,
  updateEcfitSettingsVariables as updateEcfitSettingsVariablesType,
  useUpdateEcfitSettingsFragment as useUpdateEcfitSettingsFragmentType,
  useUpdateEcfitSettingsFragment_storeEcfitSettings as useUpdateEcfitSettingsFragmentStoreEcfitSettingsType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateEcfitSettings,
  useUpdateEcfitSettingsFragment,
} from '../gqls/useUpdateEcfitSettings';

// definition
export default (): ((
  storeId: string,
  input: updateEcfitSettingsVariablesType['input'],
) => Promise<void>) => {
  const [updateEcfitSettingsMutation] = useMutation<
    updateEcfitSettingsType,
    updateEcfitSettingsVariablesType
  >(updateEcfitSettings);

  return useCallback(
    async (
      storeId: string,
      input: updateEcfitSettingsVariablesType['input'],
    ) => {
      await updateEcfitSettingsMutation({
        variables: {
          input,
        },
        update: (
          cache: DataProxy,
          { data }: { data: updateEcfitSettingsType },
        ) => {
          if (data.setStoreEcfitSettings.status !== 'OK') {
            throw new Error('can not update ecfit settings');
          }

          cache.writeFragment<useUpdateEcfitSettingsFragmentType>({
            id: storeId,
            fragment: useUpdateEcfitSettingsFragment,
            data: {
              __typename: 'Store',
              id: storeId,
              storeEcfitSettings: {
                ...(input as useUpdateEcfitSettingsFragmentStoreEcfitSettingsType),
                __typename: 'StoreEcfitSettings',
              },
            },
          });
        },
      });
    },
    [updateEcfitSettingsMutation],
  );
};
