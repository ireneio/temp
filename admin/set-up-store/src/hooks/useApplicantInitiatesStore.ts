// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { AdTrackContext } from '@admin/ad-track';
import CookiesContext from '@meepshop/cookies';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  applicantInitiatesStore as applicantInitiatesStoreType,
  applicantInitiatesStoreVariables as applicantInitiatesStoreVariablesType,
  AdminCurrencyEnum,
} from '@meepshop/types/gqls/admin';

// graqphl import
import { applicantInitiatesStore } from '../gqls/useApplicantInitiatesStore';

// typescript definition
interface ValuesType {
  cname: string;
  currency: AdminCurrencyEnum;
}

// definition
export default (): {
  loading: boolean;
  applicantInitiatesStore: (values: ValuesType) => void;
} => {
  const adTrack = useContext(AdTrackContext);
  const { setCookie } = useContext(CookiesContext);
  const router = useRouter();
  const [mutation, { loading }] = useMutation<
    applicantInitiatesStoreType,
    applicantInitiatesStoreVariablesType
  >(applicantInitiatesStore, {
    onCompleted: ({ applicantInitiatesStore: { status, token } }) => {
      if (status === 'SUCCESS' && token) {
        adTrack.custom('點擊', '月租註冊_啟用商店', '月租註冊');
        setCookie('x-meepshop-authorization-token', token);
        setTimeout(() => router.push('/'), 100);
      } else message.error(status);
    },
  });

  return {
    loading,
    applicantInitiatesStore: useCallback(
      input => {
        mutation({
          variables: { input },
        });
      },
      [mutation],
    ),
  };
};
