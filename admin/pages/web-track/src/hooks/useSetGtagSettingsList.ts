// typescript import
import { DataProxy, MutationFunction } from '@apollo/client';

// import
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

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
): MutationFunction<setGtagSettingsListType, setGtagSettingsListVariables> => {
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
