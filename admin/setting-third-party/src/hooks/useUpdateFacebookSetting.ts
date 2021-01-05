// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  updateFacebookSetting as updateFacebookSettingType,
  updateFacebookSettingVariables,
} from './__generated__/updateFacebookSetting';
import {
  useUpdateFacebookSettingWriteCache,
  useUpdateFacebookSettingWriteCache_facebookSetting as useUpdateFacebookSettingWriteCacheFacebookSetting,
} from './__generated__/useUpdateFacebookSettingWriteCache';

// definition
const mutation = gql`
  mutation updateFacebookSetting($input: UpdateFacebookSettingInput!) {
    updateFacebookSetting(input: $input) {
      status
    }
  }
`;

export default (): ((
  storeId: string,
  input: updateFacebookSettingVariables['input'],
) => Promise<void>) => {
  const [updateFacebookSettingMutation] = useMutation<
    updateFacebookSettingType,
    updateFacebookSettingVariables
  >(mutation);

  return useCallback(
    async (storeId: string, input: updateFacebookSettingVariables['input']) =>
      new Promise((resolve, reject) =>
        updateFacebookSettingMutation({
          variables: {
            input,
          },
          update: (
            cache: DataProxy,
            { data }: { data: updateFacebookSettingType },
          ) => {
            if (data.updateFacebookSetting.status !== 'OK') {
              reject(new Error('can not update facebook setting'));
              return;
            }

            cache.writeFragment<useUpdateFacebookSettingWriteCache>({
              id: storeId,
              fragment: gql`
                fragment useUpdateFacebookSettingWriteCache on Store {
                  id
                  facebookSetting {
                    isLoginEnabled
                    appId
                    appSecret
                  }
                }
              `,
              data: {
                __typename: 'Store',
                id: storeId,
                facebookSetting: {
                  ...(input as useUpdateFacebookSettingWriteCacheFacebookSetting),
                  __typename: 'FacebookSetting',
                },
              },
            });
          },
        }).then(() => {
          resolve();
        }),
      ),
    [updateFacebookSettingMutation],
  );
};
