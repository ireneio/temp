// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  updateGoodDealSettings as updateGoodDealSettingsType,
  updateGoodDealSettingsVariables,
} from './__generated__/updateGoodDealSettings';

// graphql import
import { goodDealFragment } from '../GoodDeal';

// definition
const mutation = gql`
  mutation updateGoodDealSettings($updateStoreList: [UpdateStore]) {
    updateStoreList(updateStoreList: $updateStoreList) {
      id
      setting {
        storeGoodDealSettings: gooddeal {
          ...goodDealFragment
          status
        }
      }
    }
  }

  ${goodDealFragment}
`;

export default (): ((
  updateStoreList: updateGoodDealSettingsVariables['updateStoreList'],
) => Promise<void>) => {
  const [updateGoodDealSettingsMutation] = useMutation<
    updateGoodDealSettingsType,
    updateGoodDealSettingsVariables
  >(mutation);

  return useCallback(
    async (
      updateStoreList: updateGoodDealSettingsVariables['updateStoreList'],
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
