// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateUserList as updateUserListType,
  updateUserListVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateUserList } from '../gqls/useUpdateAccountSetting';

// typescript definition
interface ValuesType {
  name: string | null;
  additionalInfo: {
    mobile: string | null;
    tel: string | null;
  };
}

// definition
export default (
  { resetFields }: FormInstance,
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
      resetFields();
    },
  });

  return {
    loading,
    updateAccountSetting: useCallback(
      values => {
        if (!id) return;

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
      [id, mutation],
    ),
  };
};
