// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  UserTypeEnum,
  loginFromLandingPage as loginFromLandingPageType,
  loginFromLandingPageVariables,
  forgotPasswordFromLandingPage as forgotPasswordFromLandingPageType,
  forgotPasswordFromLandingPageVariables,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  loginFromLandingPage,
  forgotPasswordFromLandingPage,
} from '../gqls/login';

// definition
export default ({
  form,
  cname,
  hideLogin,
  isForgotPassword,
}: {
  form: FormComponentProps['form'];
  cname: string;
  hideLogin: () => void;
  isForgotPassword: boolean;
}): ((e: React.FormEvent<HTMLFormElement>) => void) => {
  const { t } = useTranslation('landing-page');
  const [login] = useMutation<
    loginFromLandingPageType,
    loginFromLandingPageVariables
  >(loginFromLandingPage);
  const [forgotPassword] = useMutation<
    forgotPasswordFromLandingPageType,
    forgotPasswordFromLandingPageVariables
  >(forgotPasswordFromLandingPage);
  const adTrack = useContext(AdTrackContext);

  const { validateFields } = form;

  return useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      validateFields((err, { email, password }) => {
        if (err) return;

        if (isForgotPassword)
          forgotPassword({
            variables: {
              input: { email, cname, type: 'SHOPPER' as UserTypeEnum },
            },
            update: (_cache, { data }) => {
              switch (data?.sendResetPasswordEmail.status) {
                case 'OK':
                  notification.success({
                    message: t('ducks:forget-password-success'),
                  });
                  hideLogin();
                  break;

                case 'FAIL_CANNOT_FIND_USER':
                  notification.error({
                    message: t('ducks:forget-password-failure-message'),
                    description: t('ducks:cannot-find-user'),
                  });
                  break;

                default:
                  notification.error({
                    message: t('ducks:forget-password-failure-message'),
                    description: data?.sendResetPasswordEmail.status,
                  });
                  break;
              }
            },
          });
        else
          login({
            variables: {
              input: { email, password },
            },
            update: (_cache, { data }) => {
              switch (data?.login.status) {
                case 'OK':
                  notification.success({
                    message: t('ducks:forget-password-success'),
                  });
                  hideLogin();
                  adTrack.completeRegistration();
                  break;

                default:
                  notification.error({
                    message: t('ducks:invalid-email-or-password'),
                  });
                  break;
              }
            },
          });
      });
    },
    [
      adTrack,
      cname,
      forgotPassword,
      hideLogin,
      isForgotPassword,
      login,
      validateFields,
      t,
    ],
  );
};
