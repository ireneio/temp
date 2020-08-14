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
} from './__generated__/updateEcfitSettings';
import { useUpdateEcfitSettingsWriteCache } from './__generated__/useUpdateEcfitSettingsWriteCache';

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
    async (storeId: string, input: updateEcfitSettingsVariables['input']) =>
      new Promise((resolve, reject) =>
        updateEcfitSettingsMutation({
          variables: {
            input,
          },
          update: (
            cache: DataProxy,
            { data }: { data: updateEcfitSettingsType },
          ) => {
            if (data.setStoreEcfitSettings.status !== 'OK') {
              reject(new Error('can not update ecfit settings'));
              return;
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
                  ...input,
                  __typename: 'StoreEcfitSettings',
                } as useUpdateEcfitSettingsWriteCache['storeEcfitSettings'],
              },
            });
          },
        }).then(() => {
          resolve();
        }),
      ),
    [updateEcfitSettingsMutation],
  );
};
