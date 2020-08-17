// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

import {
  AdTrack as AdTrackContext,
  Currency as CurrencyContext,
} from '@meepshop/context';

import useAdTrackIds from './hooks/useAdTrackIds';
import useAdTrack from './hooks/useAdTrack';

// graphql typescript
import { getAdTrack } from './__generated__/getAdTrack';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const query = gql`
  query getAdTrack {
    getFbPixel {
      pixelId
    }

    getGtagList {
      type
      eventName
      code
    }

    viewer {
      id
      store {
        id
        cname
      }
    }
  }
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getAdTrack>(query);
  const { currency } = useContext(CurrencyContext);
  const adTrackIds = useAdTrackIds(data);
  const adTrack = useAdTrack({
    ...adTrackIds,
    cname: data?.viewer?.store?.cname || null,
    currency,
  });

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <AdTrackContext.Provider value={adTrack}>
      {children}
    </AdTrackContext.Provider>
  );
});
