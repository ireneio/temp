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
  useUpdateFacebookSettingWriteCache,
  useUpdateFacebookSettingWriteCache_facebookSetting as useUpdateFacebookSettingWriteCacheFacebookSetting,
} from '@meepshop/types/gqls/admin';

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
    async (storeId: string, input: updateFacebookSettingVariables['input']) => {
      await updateFacebookSettingMutation({
        variables: {
          input,
        },
        update: (
          cache: DataProxy,
          { data }: { data: updateFacebookSettingType },
        ) => {
          if (data.updateFacebookSetting.status !== 'OK') {
            throw new Error('can not update facebook setting');
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
      });
    },
    [updateFacebookSettingMutation],
  );
};
