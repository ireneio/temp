// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import { Spin, Icon } from 'antd';

import { fb as FbContext } from '@meepshop/context';
import { version } from '@meepshop/context/lib/fb';

import useFb from './hooks/useFb';

// graphql typescript
import { getFbAppId } from './__generated__/getFbAppId';

// definition
const query = gql`
  query getFbAppId {
    getAppLoginList(
      search: {
        size: 1
        from: 0
        filter: { and: [{ type: "exact", field: "plugin", query: "fbLogin" }] }
        sort: [{ field: "sort", order: "asc" }]
      }
    ) {
      data {
        id
        appId
      }
    }
  }
`;

export default React.memo(({ children }) => {
  const { data } = useQuery<getFbAppId>(query);
  const appId = data?.getAppLoginList?.data?.[0]?.appId || null;
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
