// import
import React, { useMemo } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { Fb as FbContext } from '@meepshop/context';
import { version, defaultAppId } from '@meepshop/context/lib/Fb';

import useFb from './hooks/useFb';

// graphql typescript
import { getFbAppId as getFbAppIdType } from '@meepshop/types/gqls/store';

// graphql import
import { getFbAppId } from './gqls';

// definition
export default React.memo(({ children }) => {
  const { data } = useQuery<getFbAppIdType>(getFbAppId);
  const { isLoginEnabled, appId } = useMemo(() => {
    const storeIsLoginEnabled =
      data?.viewer?.store?.facebookSetting.isLoginEnabled;
    const storeAppId = storeIsLoginEnabled
      ? data?.viewer?.store?.facebookSetting.appId
      : null;

    return {
      isLoginEnabled: Boolean(storeIsLoginEnabled && storeAppId),
      appId: (storeIsLoginEnabled ? storeAppId : null) || defaultAppId,
    };
  }, [data]);
  const { fb, fbScript } = useFb(appId, version);

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <>
      <Head>{fbScript}</Head>

      <FbContext.Provider
        value={{
          fb,
          appId,
          version,
          isLoginEnabled,
        }}
      >
        {children}
      </FbContext.Provider>
    </>
  );
});
