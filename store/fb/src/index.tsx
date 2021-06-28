// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
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
  const appId = useMemo(
    () =>
      (data?.viewer?.store?.facebookSetting.isLoginEnabled
        ? data?.viewer?.store?.facebookSetting.appId
        : null) || defaultAppId,
    [data],
  );
  const { fb, fbScript } = useFb(appId, version);

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <>
      <Head>{fbScript}</Head>

      <FbContext.Provider value={{ fb, appId, version }}>
        {children}
      </FbContext.Provider>
    </>
  );
});
