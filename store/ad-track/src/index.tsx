// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import Head from './Head';
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
import { getAdTrack as getAdTrackType } from './gqls/__generated__/getAdTrack';

// graphql import
import { getAdTrack } from './gqls';
import { headFragment } from './gqls/head';
import { useRetentionFragment } from './gqls/useRetention';
import { useAddToCartFragment } from './gqls/useAddToCart';
import { useViewProductFragment } from './gqls/useViewProduct';
import { useSearchFragment } from './gqls/useSearch';
import { useAddToWishListFragment } from './gqls/useAddToWishList';
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
  const store = data?.viewer?.store;
  const adTracks = store?.adTracks;

  const custom = useCustom();
  const addToCart = useAddToCart(
    !adTracks ? null : filter(useAddToCartFragment, adTracks),
  );
  const viewProduct = useViewProduct(
    !adTracks ? null : filter(useViewProductFragment, adTracks),
  );
  const search = useSearch(
    !adTracks ? null : filter(useSearchFragment, adTracks),
  );
  const addToWishList = useAddToWishList(
    !adTracks ? null : filter(useAddToWishListFragment, adTracks),
  );
  const completeRegistration = useCompleteRegistration(
    !adTracks ? null : filter(useCompleteRegistrationFragment, adTracks),
  );
  const beginCheckout = useBeginCheckout(
    !adTracks ? null : filter(useBeginCheckoutFragment, adTracks),
  );
  const purchase = usePurchase(
    !store ? null : filter(usePurchaseFragment, store),
  );

  useRetention(!store ? null : filter(useRetentionFragment, store));

  if (!adTracks) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <>
      <Head adTracks={filter(headFragment, adTracks)} />

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
