// import
import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UserTypeEnum,
  getStoreCname as getStoreCnameType,
  forgotPasswordInModal as forgotPasswordInModalType,
  forgotPasswordInModalVariables as forgotPasswordInModalVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  getStoreCname,
  forgotPasswordInModal,
} from '../gqls/useForgetPassword';

// graphql definition
interface ReturnType {
  forgetPassword: (values: { email: string }) => void;
  loading: boolean;
}

// definition
export default (
  setIsForgetPassword: (isForgetPassword: boolean) => void,
): ReturnType => {
  const { t } = useTranslation('login-modal');
  const result = useQuery<getStoreCnameType>(getStoreCname);
  const cname = result.data?.viewer?.store?.cname;
  const [mutation, { loading }] = useMutation<
    forgotPasswordInModalType,
    forgotPasswordInModalVariablesType
  >(forgotPasswordInModal, {
    onCompleted: ({ sendResetPasswordEmail: { status } }) => {
      switch (status) {
        case 'OK':
          notification.success({
            message: t('forget-password.success'),
          });
          setIsForgetPassword(false);
          break;

        case 'FAIL_CANNOT_FIND_USER':
          notification.error({
            message: t('forget-password.fail'),
            description: t('forget-password.cannot-find-user'),
          });
          break;

        default:
          notification.error({
            message: t('forget-password.fail'),
            description: status,
          });
          break;
      }
    },
  });

  return {
    forgetPassword: useCallback(
      values => {
        mutation({
          variables: {
            input: { ...values, cname, type: 'SHOPPER' as UserTypeEnum },
          },
        });
      },
      [cname, mutation],
    ),
    loading,
  };
};
