// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { AdTrackContext } from '@admin/ad-track';
import message from '@admin/message';
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
  const { query, replace } = useRouter();
  const [mutation, { loading }] = useMutation<
    applicantInitiatesStoreType,
    applicantInitiatesStoreVariablesType
  >(applicantInitiatesStore, {
    onCompleted: ({ applicantInitiatesStore: { status } }) => {
      if (status === 'SUCCESS') {
        adTrack.custom('點擊', '月租註冊_啟用商店', '月租註冊');
        replace('/');
      } else message.error(status);
    },
  });

  return {
    loading,
    applicantInitiatesStore: useCallback(
      input => {
        if (query.token)
          mutation({
            variables: {
              input: {
                ...input,
                merchantApplicantToken: query.token as string,
              },
            },
          });
      },
      [mutation, query],
    ),
  };
};
