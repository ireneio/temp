// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateUserList as updateUserListType,
  updateUserListVariables,
  accountFragment as accountFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { updateUserList } from '../gqls/useSave';
import { accountFragment } from '../gqls/account';

// definition
export default (
  { validateFields, resetFields }: FormComponentProps['form'],
  id: string | null,
): {
  save: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
} => {
  const { t } = useTranslation('account-setting');

  const [mutation, { loading }] = useMutation<
    updateUserListType,
    updateUserListVariables
  >(updateUserList, {
    update: (cache, result) => {
      const data = result.data?.updateUserList?.[0];

      if (!data || !id) {
        message.error(t('error'));
        return;
      }

      message.success(t('success'));

      cache.writeFragment<accountFragmentType>({
        id,
        fragment: accountFragment,
        data: {
          __typename: 'User',
          id,
          email: data.email,
          name: data.name,
          additionalInfo: !data.additionalInfo
            ? null
            : {
                __typename: 'AdditionalInfoObjectType',
                mobile: data.additionalInfo.mobile,
                tel: data.additionalInfo.tel,
              },
        },
      });

      resetFields();
    },
  });

  return {
    loading,
    save: useCallback(
      e => {
        e.preventDefault();
        validateFields(async (_, { name, mobile, tel }) => {
          if (id)
            mutation({
              variables: {
                updateUserList: [
                  {
                    id,
                    name,
                    additionalInfo: {
                      mobile,
                      tel,
                    },
                  },
                ],
              },
            });
        });
      },
      [validateFields, id, mutation],
    ),
  };
};
