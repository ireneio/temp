// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  updateFacebookSetting as updateFacebookSettingType,
  updateFacebookSettingVariables as updateFacebookSettingVariablesType,
  useUpdateFacebookSettingFragment as useUpdateFacebookSettingFragmentType,
  useUpdateFacebookSettingFragment_facebookSetting as useUpdateFacebookSettingFragmentFacebookSettingType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateFacebookSetting,
  useUpdateFacebookSettingFragment,
} from '../gqls/useUpdateFacebookSetting';

// definition
export default (): ((
  storeId: string,
  input: updateFacebookSettingVariablesType['input'],
) => Promise<void>) => {
  const [updateFacebookSettingMutation] = useMutation<
    updateFacebookSettingType,
    updateFacebookSettingVariablesType
  >(updateFacebookSetting);

  return useCallback(
    async (
      storeId: string,
      input: updateFacebookSettingVariablesType['input'],
    ) => {
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

          cache.writeFragment<useUpdateFacebookSettingFragmentType>({
            id: storeId,
            fragment: useUpdateFacebookSettingFragment,
            data: {
              __typename: 'Store',
              id: storeId,
              facebookSetting: {
                ...(input as useUpdateFacebookSettingFragmentFacebookSettingType),
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
