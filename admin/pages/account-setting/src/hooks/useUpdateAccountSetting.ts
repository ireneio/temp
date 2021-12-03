// typescript import
import { ValuesType } from './useInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { areEqual } from 'fbjs';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateUserList as updateUserListType,
  updateUserListVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateUserList } from '../gqls/useUpdateAccountSetting';

// definition
export default (
  initialValues: ValuesType | undefined,
  id: string | null,
): {
  updateAccountSetting: (values: ValuesType) => void;
  loading: boolean;
} => {
  const { t } = useTranslation('account-setting');
  const [mutation, { loading }] = useMutation<
    updateUserListType,
    updateUserListVariables
  >(updateUserList, {
    onCompleted: data => {
      if (!data?.updateUserList?.[0]?.id) {
        message.error(t('error'));
        return;
      }

      message.success(t('success'));
    },
  });

  return {
    loading,
    updateAccountSetting: useCallback(
      values => {
        if (!id || areEqual(initialValues, values)) return;

        mutation({
          variables: {
            updateUserList: [
              {
                ...values,
                id,
              },
            ],
          },
        });
      },
      [initialValues, id, mutation],
    ),
  };
};
