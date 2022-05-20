// import
import { useCallback, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  firstPurchaseSignUp as firstPurchaseSignUpType,
  firstPurchaseSignUpVariables as firstPurchaseSignUpVariablesType,
  firstPurchaseLogin as firstPurchaseLoginType,
  firstPurchaseLoginVariables as firstPurchaseLoginVariablesType,
  UserTypeEnum as UserTypeEnumType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  firstPurchaseSignUp,
  firstPurchaseLogin,
} from '../gqls/useFirstPurchase';

// definition
export default (): (({
  viewerEmail,
  viewerPassword,
}: {
  viewerEmail: string;
  viewerPassword: string;
}) => Promise<boolean>) => {
  const { t } = useTranslation('checkout');
  const adTrack = useContext(AdTrackContext);
  const [signUpMutation] = useMutation<
    firstPurchaseSignUpType,
    firstPurchaseSignUpVariablesType
  >(firstPurchaseSignUp);
  const [loginMutation] = useMutation<
    firstPurchaseLoginType,
    firstPurchaseLoginVariablesType
  >(firstPurchaseLogin);

  return useCallback(
    async ({ viewerEmail, viewerPassword }) => {
      const { data: createUserData } = await signUpMutation({
        variables: {
          createUserList: [
            {
              type: 'SHOPPER' as UserTypeEnumType,
              email: viewerEmail,
              password: viewerPassword,
            },
          ],
        },
      });

      if ((createUserData?.createUserList || []).length === 0) {
        notification.error({
          message: t('pay-fail'),
          description: t('sign-up-failure-message'),
        });

        return false;
      }

      adTrack.completeRegistration();

      const { data: loginData } = await loginMutation({
        variables: {
          input: { email: viewerEmail, password: viewerPassword },
        },
      });

      if (loginData?.login.status !== 'OK') {
        notification.error({
          message: t('pay-fail'),
          description: t('invalid-email-or-password'),
        });

        return false;
      }

      return true;
    },
    [t, adTrack, signUpMutation, loginMutation],
  );
};
