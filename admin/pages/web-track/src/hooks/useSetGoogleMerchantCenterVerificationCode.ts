// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import message from '@admin/message';
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

// typescript definition
interface ValuesType {
  verificationCode: string;
}

// definition
export default (
  storeId: string,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    setGoogleMerchantCenterVerificationCodeType,
    setGoogleMerchantCenterVerificationCodeVariables
  >(setGoogleMerchantCenterVerificationCode);

  return useCallback(
    input => {
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
                googleMerchantCenterVerificationCode: input.verificationCode,
              },
            },
          });
          message.success(t('save-success'));
          setEditMode(false);
        },
      });
    },
    [storeId, setEditMode, t, mutation],
  );
};
