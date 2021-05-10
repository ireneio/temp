// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useContext, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { AdTrackContext } from '@admin/ad-track';

// graphql typescript
import { applyForStore as applyForStoreType } from '@meepshop/types/gqls/admin';

// graphql import
import { applyForStore } from '../gqls/useApplyForStore';

// definition
export default ({
  validateFields,
}: FormComponentProps['form']): {
  loading: boolean;
  isApplyForStoreCompleted: boolean;
  applyForStore: (e: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const adTrack = useContext(AdTrackContext);
  const [isApplyForStoreCompleted, setIsApplyForStoreCompleted] = useState(
    false,
  );

  const [mutation, { loading }] = useMutation<applyForStoreType>(
    applyForStore,
    {
      onCompleted: ({ applyForStore: { status } }) => {
        if (status === 'SUCCESS') {
          setIsApplyForStoreCompleted(true);
          adTrack.custom('點擊', '月租註冊_註冊信箱', '月租註冊');
        } else message.error(status);
      },
    },
  );

  return {
    loading,
    isApplyForStoreCompleted,
    applyForStore: useCallback(
      e => {
        e.preventDefault();

        validateFields((errors, { email, password }) => {
          if (!errors) {
            mutation({ variables: { input: { email, password } } });
          }
        });
      },
      [validateFields, mutation],
    ),
  };
};
