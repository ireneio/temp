// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';
import { Spin, Icon } from 'antd';

import useFb from './hooks/useFb';

// graphql typescript
import { getFbAppId } from './__generated__/getFbAppId';

// definition
const FbContext = React.createContext<{
  fb: typeof window['FB'] | null;
  fbAppId: string | null;
}>({
  fb: null,
  fbAppId: null,
});

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

export const FbProvider = React.memo(({ children }) => {
  const { data } = useQuery<getFbAppId>(query);
  const fbAppId = data?.getAppLoginList?.data?.[0]?.appId || null;
  const { fb, fbScript } = useFb(fbAppId);

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <>
      <Head>{fbScript}</Head>

      <FbContext.Provider value={{ fb, fbAppId }}>
        {children}
      </FbContext.Provider>
    </>
  );
});

export default FbContext;
