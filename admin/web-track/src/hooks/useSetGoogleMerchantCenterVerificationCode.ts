// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  setGoogleMerchantCenterVerificationCode as setGoogleMerchantCenterVerificationCodeType,
  setGoogleMerchantCenterVerificationCodeVariables,
  useSetGoogleMerchantCenterVerificationCodeFragment as useSetGoogleMerchantCenterVerificationCodeFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useSetGoogleMerchantCenterVerificationCodeFragment,
  setGoogleMerchantCenterVerificationCode,
} from '../gqls/useSetGoogleMerchantCenterVerificationCode';

// definition
export default (
  storeId: string,
  { validateFields }: FormComponentProps['form'],
): (() => Promise<boolean>) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    setGoogleMerchantCenterVerificationCodeType,
    setGoogleMerchantCenterVerificationCodeVariables
  >(setGoogleMerchantCenterVerificationCode);

  return useCallback(
    () =>
      new Promise(resolve => {
        validateFields((errors, input) => {
          if (errors) {
            resolve(false);
            return;
          }

          mutation({
            variables: {
              input,
            },
            update: (cache, { data }) => {
              if (
                data?.setGoogleMerchantCenterVerificationCode.__typename !==
                'OkResponse'
              ) {
                message.error(t('save-fail'));
                resolve(false);
                return;
              }

              cache.writeFragment<
                useSetGoogleMerchantCenterVerificationCodeFragmentType
              >({
                id: storeId,
                fragment: useSetGoogleMerchantCenterVerificationCodeFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  adTracks: {
                    __typename: 'AdTracks',
                    googleMerchantCenterVerificationCode:
                      input.verificationCode,
                  },
                },
              });
              message.success(t('save-success'));
              resolve(true);
            },
          });
        });
      }),
    [storeId, validateFields, t, mutation],
  );
};
