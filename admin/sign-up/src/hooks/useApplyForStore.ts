// import
import { useContext, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { AdTrackContext } from '@admin/ad-track';

// graphql typescript
import {
  applyForStore as applyForStoreType,
  applyForStoreVariables as applyForStoreVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { applyForStore } from '../gqls/useApplyForStore';

// typescript definition
export interface ValuesType {
  email: string;
  password: string;
  confirmPassword: string;
}

// definition
export default (): {
  loading: boolean;
  isApplyForStoreCompleted: boolean;
  applyForStore: (values: ValuesType) => void;
} => {
  const adTrack = useContext(AdTrackContext);
  const [isApplyForStoreCompleted, setIsApplyForStoreCompleted] = useState(
    false,
  );
  const [mutation, { loading }] = useMutation<
    applyForStoreType,
    applyForStoreVariablesType
  >(applyForStore, {
    onCompleted: ({ applyForStore: { status } }) => {
      if (status === 'SUCCESS') {
        setIsApplyForStoreCompleted(true);
        adTrack.custom('點擊', '月租註冊_註冊信箱', '月租註冊');
      } else message.error(status);
    },
  });

  return {
    loading,
    isApplyForStoreCompleted,
    applyForStore: useCallback(
      ({ confirmPassword: _, ...input }) => {
        mutation({ variables: { input } });
      },
      [mutation],
    ),
  };
};
