// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  setGtagSettingsList as setGtagSettingsListType,
  setGtagSettingsListVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setGtagSettingsList } from '../gqls/useSetGtagSettingsList';

// definition
export default (
  callback: (cache: DataProxy, data?: setGtagSettingsListType | null) => void,
): MutationTuple<setGtagSettingsListType, setGtagSettingsListVariables>[0] => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    setGtagSettingsListType,
    setGtagSettingsListVariables
  >(setGtagSettingsList, {
    update: (cache, { data }) => {
      message.success(t('save-success'));
      callback(cache, data);
    },
  });

  return mutation;
};
