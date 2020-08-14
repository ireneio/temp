// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import { Spin, Icon } from 'antd';

import { fb as FbContext } from '@meepshop/context';
import { version, defaultAppId } from '@meepshop/context/lib/fb';

import useFb from './hooks/useFb';

// graphql typescript
import { getFbAppId } from './__generated__/getFbAppId';

// definition
const query = gql`
  query getFbAppId {
    viewer {
      id
      store {
        id
        facebookSetting {
          isLoginEnabled
          appId
        }
      }
    }
  }
`;

export default React.memo(({ children }) => {
  const { data } = useQuery<getFbAppId>(query);
  const appId = useMemo(
    () =>
      (data?.viewer?.store?.facebookSetting.isLoginEnabled
        ? data?.viewer?.store?.facebookSetting.appId
        : null) || defaultAppId,
    [data],
  );
  const { fb, fbScript } = useFb(appId, version);

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <>
      <Head>{fbScript}</Head>

      <FbContext.Provider value={{ fb, appId, version }}>
        {children}
      </FbContext.Provider>
    </>
  );
});
