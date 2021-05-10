// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { AdTrackContext } from '@admin/ad-track';
import CookiesContext from '@meepshop/cookies';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { applicantInitiatesStore as applicantInitiatesStoreType } from '@meepshop/types/gqls/admin';

// graqphl import
import { applicantInitiatesStore } from '../gqls/useApplicantInitiatesStore';

// definition
export default ({
  validateFields,
}: FormComponentProps['form']): {
  loading: boolean;
  applicantInitiatesStore: (e: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const adTrack = useContext(AdTrackContext);
  const { setCookie } = useContext(CookiesContext);
  const router = useRouter();

  const [mutation, { loading }] = useMutation<applicantInitiatesStoreType>(
    applicantInitiatesStore,
    {
      onCompleted: ({ applicantInitiatesStore: { status, token } }) => {
        if (status === 'SUCCESS' && token) {
          adTrack.custom('點擊', '月租註冊_啟用商店', '月租註冊');
          setCookie('x-meepshop-authorization-token', token);

          setTimeout(() => router.push('/'), 100);
        } else message.error(status);
      },
    },
  );

  return {
    loading,
    applicantInitiatesStore: useCallback(
      e => {
        e.preventDefault();

        validateFields((errors, { cname, currency }) => {
          if (!errors) {
            mutation({
              variables: { input: { cname, currency } },
            });
          }
        });
      },
      [validateFields, mutation],
    ),
  };
};
