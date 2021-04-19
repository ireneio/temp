// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  updateEcfitSettings as updateEcfitSettingsType,
  updateEcfitSettingsVariables,
  useUpdateEcfitSettingsWriteCache,
  useUpdateEcfitSettingsWriteCache_storeEcfitSettings as useUpdateEcfitSettingsWriteCacheStoreEcfitSettings,
} from '@meepshop/types/gqls/admin';

// definition
const mutation = gql`
  mutation updateEcfitSettings($input: SetStoreEcfitSettingsInput!) {
    setStoreEcfitSettings(input: $input) {
      status
    }
  }
`;

export default (): ((
  storeId: string,
  input: updateEcfitSettingsVariables['input'],
) => Promise<void>) => {
  const [updateEcfitSettingsMutation] = useMutation<
    updateEcfitSettingsType,
    updateEcfitSettingsVariables
  >(mutation);

  return useCallback(
    async (storeId: string, input: updateEcfitSettingsVariables['input']) => {
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

          cache.writeFragment<useUpdateEcfitSettingsWriteCache>({
            id: storeId,
            fragment: gql`
              fragment useUpdateEcfitSettingsWriteCache on Store {
                id
                storeEcfitSettings {
                  isEnabled
                  serviceType
                  companyToken
                  apiKey
                }
              }
            `,
            data: {
              __typename: 'Store',
              id: storeId,
              storeEcfitSettings: {
                ...(input as useUpdateEcfitSettingsWriteCacheStoreEcfitSettings),
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
