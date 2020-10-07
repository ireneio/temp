// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  setGtagSettingsList as setGtagSettingsListType,
  setGtagSettingsListVariables,
} from './__generated__/setGtagSettingsList';

// graphql import
import { storeAdTrackGtagFragment } from '@meepshop/apollo/lib/fragments/storeAdTrack';

// definition
export default (
  callback: (cache: DataProxy, data?: setGtagSettingsListType | null) => void,
): MutationTuple<setGtagSettingsListType, setGtagSettingsListVariables>[0] => {
  const { t } = useTranslation('web-track');
  const [setGtagSettingsList] = useMutation<
    setGtagSettingsListType,
    setGtagSettingsListVariables
  >(
    gql`
      mutation setGtagSettingsList($setInput: [setGtagInput]) {
        setGtagSettingsList(setInput: $setInput) {
          ...storeAdTrackGtagFragment
          code
        }
      }

      ${storeAdTrackGtagFragment}
    `,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));
        callback(cache, data);
      },
    },
  );

  return setGtagSettingsList;
};
