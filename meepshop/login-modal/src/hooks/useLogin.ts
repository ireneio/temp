// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  loginInModal as loginInModalType,
  loginInModalVariables as loginInModalVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { loginInModal } from '../gqls/useLogin';

// graphql definition
interface ReturnType {
  login: (values: { email: string; password: string }) => void;
  loading: boolean;
}

// definition
export default (): ReturnType => {
  const adTrack = useContext(AdTrackContext);
  const { t } = useTranslation('login-modal');
  const [mutation, { loading }] = useMutation<
    loginInModalType,
    loginInModalVariablesType
  >(loginInModal, {
    onCompleted: data => {
      switch (data?.login.status) {
        case 'OK':
          notification.success({
            message: t('member-login.success'),
          });
          adTrack.completeRegistration();
          break;

        default:
          notification.error({
            message: t('member-login.invalid-email-or-password'),
          });
          break;
      }
    },
  });

  return {
    login: useCallback(
      values => {
        mutation({
          variables: {
            input: values,
          },
        });
      },
      [mutation],
    ),
    loading,
  };
};
