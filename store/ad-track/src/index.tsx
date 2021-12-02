// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import Head from './Head';
import useFbq from './hooks/useFbq';
import useRetention from './hooks/useRetention';
import useCustom from './hooks/useCustom';
import useAddToCart from './hooks/useAddToCart';
import useViewProduct from './hooks/useViewProduct';
import useSearch from './hooks/useSearch';
import useAddToWishList from './hooks/useAddToWishList';
import useCompleteRegistration from './hooks/useCompleteRegistration';
import useBeginCheckout from './hooks/useBeginCheckout';
import usePurchase from './hooks/usePurchase';

// graphql typescript
import { getAdTrack as getAdTrackType } from '@meepshop/types/gqls/store';

// graphql import
import { getAdTrack } from './gqls';
import { headFragment } from './gqls/head';
import { useFbqFragment } from './gqls/useFbq';
import { useRetentionFragment } from './gqls/useRetention';
import { useAddToCartFragment } from './gqls/useAddToCart';
import { useViewProductFragment } from './gqls/useViewProduct';
import { useSearchFragment } from './gqls/useSearch';
import { useCompleteRegistrationFragment } from './gqls/useCompleteRegistration';
import { useBeginCheckoutFragment } from './gqls/useBeginCheckout';
import { usePurchaseFragment } from './gqls/usePurchase';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getAdTrackType>(getAdTrack);
  const store = data?.viewer?.store || null;
  const adTracks = store?.adTracks || null;

  const fbq = useFbq(filter(useFbqFragment, store));
  const custom = useCustom(fbq);
  const addToCart = useAddToCart(filter(useAddToCartFragment, adTracks), fbq);
  const viewProduct = useViewProduct(
    filter(useViewProductFragment, adTracks),
    fbq,
  );
  const search = useSearch(filter(useSearchFragment, adTracks), fbq);
  const addToWishList = useAddToWishList(fbq);
  const completeRegistration = useCompleteRegistration(
    filter(useCompleteRegistrationFragment, adTracks),
    fbq,
  );
  const beginCheckout = useBeginCheckout(
    filter(useBeginCheckoutFragment, adTracks),
    fbq,
  );
  const purchase = usePurchase(filter(usePurchaseFragment, store), fbq);

  useRetention(filter(useRetentionFragment, store), fbq);

  if (!adTracks) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <>
      <Head adTracks={filter(headFragment, adTracks)} fbq={fbq} />

      <AdTrackContext.Provider
        value={{
          custom,
          addToCart,
          viewProduct,
          search,
          addToWishList,
          completeRegistration,
          beginCheckout,
          purchase,
        }}
      >
        {children}
      </AdTrackContext.Provider>
    </>
  );
});
