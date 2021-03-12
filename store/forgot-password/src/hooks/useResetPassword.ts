// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  resetPassword as resetPasswordType,
  resetPasswordVariables,
} from '@meepshop/types/gqls/store';

// definition
const mutation = gql`
  mutation resetPassword($input: SetUserPasswordByTokenInput!) {
    setUserPasswordByToken(input: $input) {
      status
    }
  }
`;

export default (
  token: string,
  { validateFields }: FormComponentProps['form'],
): ((e: React.FormEvent) => void) => {
  const { t } = useTranslation('forgot-password');
  const router = useRouter();
  const [resetPassword] = useMutation<
    resetPasswordType,
    resetPasswordVariables
  >(mutation, {
    onCompleted: (data: resetPasswordType) => {
      switch (data.setUserPasswordByToken.status) {
        case 'SUCCESS':
          notification.success({
            message: t('success'),
          });
          router.push('/login');
          break;
        case 'FAIL_TOKEN_TIMEOUT':
        case 'FAIL_TOKEN_NOT_FOUND':
          notification.error({
            message: t('error'),
          });
          break;
        default:
          notification.error({
            message: t('fail'),
            description: data.setUserPasswordByToken.status,
          });
      }
    },
  });

  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      validateFields((err, { password }) => {
        if (err) return;

        resetPassword({
          variables: {
            input: {
              token,
              password,
            },
          },
        });
      });
    },
    [token, validateFields, resetPassword],
  );
};
