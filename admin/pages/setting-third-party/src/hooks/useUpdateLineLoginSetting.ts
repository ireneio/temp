// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  updateLineLoginSetting as updateLineLoginSettingType,
  updateLineLoginSettingVariables as updateLineLoginSettingVariablesType,
  useUpdateLineLoginSettingFragment as useUpdateLineLoginSettingFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateLineLoginSetting,
  useUpdateLineLoginSettingFragment,
} from '../gqls/useUpdateLineLoginSetting';

// definition
export default (): ((
  storeId: string,
  input: updateLineLoginSettingVariablesType['input'],
) => Promise<void>) => {
  const [mutation] = useMutation<
    updateLineLoginSettingType,
    updateLineLoginSettingVariablesType
  >(updateLineLoginSetting);

  return useCallback(
    async (
      storeId: string,
      input: updateLineLoginSettingVariablesType['input'],
    ) => {
      await mutation({
        variables: {
          input,
        },
        update: (
          cache: DataProxy,
          { data }: { data: updateLineLoginSettingType },
        ) => {
          if (data.updateLineLoginSetting.__typename !== 'OkResponse') {
            throw new Error('can not update line setting');
          }

          cache.writeFragment<useUpdateLineLoginSettingFragmentType>({
            id: storeId,
            fragment: useUpdateLineLoginSettingFragment,
            data: {
              __typename: 'Store',
              id: storeId,
              lineLoginSetting: {
                __typename: 'LineLoginSetting',
                isLoginEnabled: input.isLoginEnabled,
                channelId: input.channelId || null,
                channelSecret: input.channelSecret || null,
              },
            },
          });
        },
      });
    },
    [mutation],
  );
};
