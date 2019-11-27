// import
import React, { useContext } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';
import idx from 'idx';

import CurrencyContext from '@store/currency';

import useAdTrackIds from './hooks/useAdTrackIds';
import useAdTrack from './hooks/useAdTrack';

// graphql typescript
import { getAdTrack } from './__generated__/getAdTrack';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const AdTrackContext = React.createContext<{
  adTrack: ReturnType<typeof useAdTrack>;
}>({
  adTrack: {
    addToCart: () => {},
    viewProduct: () => {},
    search: () => {},
    addToWishList: () => {},
    completeRegistration: () => {},
    beginCheckout: () => {},
    purchase: () => {},
  },
});

// TODO: merge to AdTrackProvider after using @apollo/react-hook
const AdTrack = ({
  data,
  children,
}: PropsType & { data: getAdTrack }): React.ReactElement => {
  const { currency } = useContext(CurrencyContext);

  return (
    <AdTrackContext.Provider
      value={{
        adTrack: useAdTrack({
          ...useAdTrackIds(data),
          cname: idx(data, _ => _.viewer.store.cname) || null,
          currency,
        }),
      }}
    >
      {children}
    </AdTrackContext.Provider>
  );
};

export const AdTrackProvider = React.memo(({ children }: PropsType) => (
  <Query<getAdTrack>
    query={gql`
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
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error || !data)
        return <Spin indicator={<Icon type="loading" spin />} />;

      return <AdTrack data={data}>{children}</AdTrack>;
    }}
  </Query>
));

export default AdTrackContext;
